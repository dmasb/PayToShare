import {Component, OnInit} from '@angular/core';
import {LicenseService} from '../../../services/product/license.service';
import {License} from '../../../models/products/license';
import {Cart} from '../../../models/products/cart';
import {UserSessionService} from '../../../services/user-session.service';
import {StarService} from '../../../services/product/star.service';
import {Rating} from '../../../models/rating';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../models/products/product';
import {ProductsService} from '../../../services/crud/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {

  private licenses: License[];
  private cart: Cart;
  private userId: string;
  private licId: any;
  private ratings: Rating[];
  private products: Product[];
  img: any;

  constructor(private licenseService: LicenseService,
              private userSessionService: UserSessionService,
              private starService: StarService,
              private modalService: NgbModal,
              private productService: ProductsService,
              private router: Router) {
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

  add(license: License) {
    if (!this.cart) {
      this.router.navigate(['/register']);
    } else {
      this.cart.add(license);
      this.userSessionService.updateCart(this.cart);
    }
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

  sort() {
    const selectedOption = (document.getElementById('sortSales') as HTMLSelectElement);

    switch (selectedOption.value) {
      case 'desc': {
        this.licenses.sort((a, b) => (this.getObjectRating(a.id) > this.getObjectRating(b.id) ? -1 : 1));
        break;
      }
      case 'asc': {
        this.licenses.sort((a, b) => (this.getObjectRating(a.id) < this.getObjectRating(b.id) ? -1 : 1));
        break;
      }
      case 'low': {
        this.licenses.sort((a, b) => (
          ((a.salePrice === 0) ? a.price : a.salePrice) <
          ((b.salePrice === 0) ? b.price : b.salePrice) ? -1 : 1));
        break;
      }
      case 'high': {
        this.licenses.sort((a, b) => (
          ((a.salePrice === 0) ? a.price : a.salePrice) >
          ((b.salePrice === 0) ? b.price : b.salePrice) ? -1 : 1));
        break;
      }
    }
  }

  isVideoFormat(product: Product) {
    if (product.format.name === 'MP4') {
      return true;
    }
  }

  openCenteredDialog(viewIncludedProducts, license: License) {
    this.productService.getProductsByTagAndFormat(license.tag.id, license.format.id).subscribe(products => this.products = products);
    this.modalService.open(viewIncludedProducts, {centered: true});
    return false;
  }
}
