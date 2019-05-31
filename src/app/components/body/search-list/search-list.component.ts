import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {License} from '../../../models/products/license';
import {LicenseService} from '../../../services/product/license.service';
import {Plan} from '../../../models/products/plan';
import {Cart} from '../../../models/products/cart';
import {UserSessionService} from '../../../services/user-session.service';
import {Rating} from '../../../models/rating';
import {StarService} from '../../../services/product/star.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  private licenses: License[] = [];
  private cart: Cart;
  private searchWord: string;
  private userId: string;
  private licId: any;
  private ratings: Rating[];
  private products: Product[];

  constructor(private route: ActivatedRoute,
              private licenseService: LicenseService,
              private userSessionService: UserSessionService,
              private starService: StarService,
              private modalService: NgbModal,
              private productService: ProductsService) {
  }

  ngOnInit() {
    this.starService.getRatings().subscribe(ratings => this.ratings = ratings);
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    this.userSessionService.getUserDoc().subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.cart = Cart.clone(user.cart);
      }
    });
  }

  consLog(licenseId) {
    this.licId = licenseId;
  }

  get licenseId() {
    return this.licId;
  }

  getObjectRating(objectID: string): number {
    if (this.ratings) {
      const objectRatings = this.ratings.filter(res => res.objectID === objectID);
      const numberArray = objectRatings.map(r => r.value);
      return numberArray.length ? numberArray.reduce((total, val) => total + val) / numberArray.length : 0;
    }
  }

  getLicenses(): License[] {
    const keyword = this.route.snapshot.paramMap.get('searchWord').toLowerCase();
    this.searchWord = keyword;
    return this.licenses.filter(license => {
      const title = license.title.toLowerCase();
      const format = license.format.name.toLowerCase();
      const tag = license.tag.name.toLowerCase();
      return title.includes(keyword) ||
        format.includes(keyword) ||
        tag.includes(keyword);
    });
  }

  addLicense(license: License) {
    this.cart.add(license);
    this.userSessionService.updateCart(this.cart);
  }

  addPlan(plan: Plan) {
    this.cart.plan = plan;
    this.userSessionService.updateCart(this.cart);
  }

  openCenteredDialog(viewIncludedProducts, license: License) {
    this.productService.getProductsByTagAndFormat(license.tag.id, license.format.id).subscribe(products => this.products = products);
    this.modalService.open(viewIncludedProducts, {centered: true});
    return false;
  }
}
