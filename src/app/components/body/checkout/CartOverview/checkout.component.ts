import {Component, OnInit} from '@angular/core';
import {UserSessionService} from 'src/app/services/user-session.service';
import {Cart} from 'src/app/models/products/cart';
import {ProcessorderService} from '../../../../services/mail/processorder.service';
import {User} from '../../../../models/user';
import {License} from '../../../../models/products/license';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private cart: Cart = new Cart();
  private user: User;

  constructor(private orderService: ProcessorderService,
              private session: UserSessionService,
              private router: Router) {
  }

  ngOnInit() {
    this.session.getUserDoc().subscribe(user => {
      if (user) {
        this.user = user;
        this.cart = Cart.clone(user.cart);
      }
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

  async process() {
    if (await this.orderService.processOrder(this.user, this.cart)) {
      this.router.navigate(['/order-confirmed']);
    }
  }

  removePlan() {
    this.cart.removePlan();
    this.session.updateCart(this.cart);
  }
}
