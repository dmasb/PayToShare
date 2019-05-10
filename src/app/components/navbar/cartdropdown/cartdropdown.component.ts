import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "../../../services/user-session.service";
import {User} from "../../../models/user";
import {Cart} from "../../../models/products/cart";

@Component({
  selector: 'app-cartdropdown',
  templateUrl: './cartdropdown.component.html',
  styleUrls: ['./cartdropdown.component.scss']
})
export class CartdropdownComponent implements OnInit {

  user: User = new User();
  cart: Cart = new Cart();

  constructor(private session: UserSessionService) {
  }


  ngOnInit() {
    this.cart = this.session.cart;
  }
}
