import { Component, OnInit } from '@angular/core';
import { Cart} from "../../../models/products/cart";
import {Observable} from "rxjs";
import {Product} from "../../../models/products/product";
import {UserSessionService} from "../../../services/user-session.service";
import {map} from "rxjs/operators";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  user: IUser;
  cart: Cart = new Cart();

  constructor(private session: UserSessionService) { }

  ngOnInit() {
    this.session.currentUser().pipe(map( (user) => this.user = user));
    this.cart = <Cart>this.user.cart; // Casting ICart->Cart to access class methods.


    // LOAD SHOPPING CART FROM SERVICE HERE.

    // MOVE OBSERVABLE DATA TO CART OBJECT

    // COMPUTATIONS FROM OBSERVABLE TO CART CLIENT-SIDE REDUCES STRAIN ON SERVER

    // for each in cart$ -> cart.add (product)
  }
}
