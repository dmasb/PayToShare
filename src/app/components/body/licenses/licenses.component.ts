import { Component, OnInit } from '@angular/core';
import {LicenseService} from '../../../services/product/license.service';
import {License} from '../../../models/products/license';
import {Cart} from '../../../models/products/cart';
import {UserSessionService} from '../../../services/user-session.service';
import {Product} from '../../../models/products/product';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {

  private licenses: License[];
  private cart: Cart;
  constructor(private licenseService: LicenseService,
              private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.cart = new Cart();
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    this.userSessionService.getUserDoc().subscribe(user => {
      this.cart = Cart.clone(user.cart);
    });
  }

  add(license: License) {
    this.cart.add(license);
    this.userSessionService.updateCart(this.cart);
  }
}
