import {Component, OnInit} from '@angular/core';
import {Cart} from '../../../../models/products/cart';
import {UserSessionService} from 'src/app/services/user-session.service';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.scss']
})
export class OrderConfirmedComponent implements OnInit {

  private cart: Cart = new Cart();

  constructor(private session: UserSessionService) {
  }

  ngOnInit() {
    this.session.getUserDoc().subscribe(user => {
      if (user) {
        this.cart = Cart.clone(user.cart);
      }
    });
  }
}
