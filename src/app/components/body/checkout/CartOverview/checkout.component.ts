import {Component, OnInit} from '@angular/core';
import {UserSessionService} from 'src/app/services/user-session.service';
import {Cart} from 'src/app/models/products/cart';
import {ProcessorderService} from '../../../../services/mail/processorder.service';
import {User} from '../../../../models/user';
import {License} from '../../../../models/products/license';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private cart: Cart = new Cart();
  private user: User;

  constructor(private orderService: ProcessorderService, private session: UserSessionService) {
  }

  ngOnInit() {
    this.session.getUserDoc().subscribe(user => {
      this.user = user;
      this.cart = Cart.clone(user.cart);
    });

  }

  // GET CART FROM DB

  // UPDATE LOCALLY

  // UPDATE CART


  increaseQuantity(license: License) {
    this.cart.add(license);
    this.session.updateCart(this.cart);
  }

  decreaseQuantity(license: License) {
    this.cart.remove(license);
    this.session.updateCart(this.cart);
  }

  removeAll(license: License) {
    this.cart.removeAllOf(license);
    this.session.updateCart(this.cart);
  }

  process() {
    this.orderService.processOrder(this.user, this.cart);
  }

  removePlan() {
    this.cart.removePlan();
    this.session.updateCart(this.cart);
  }
}
