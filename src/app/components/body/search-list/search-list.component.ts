import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {License} from '../../../models/products/license';
import {LicenseService} from '../../../services/product/license.service';
import {Plan} from '../../../models/products/plan';
import {Cart} from '../../../models/products/cart';
import {UserSessionService} from '../../../services/user-session.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  private licenses: License[] = [];
  private cart: Cart;
  private searchWord: string;

  constructor(private route: ActivatedRoute,
              private licenseService: LicenseService,
              private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    this.cart = new Cart();
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    this.userSessionService.getUserDoc().subscribe(user => {
      this.cart = Cart.clone(user.cart);
    });
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
}
