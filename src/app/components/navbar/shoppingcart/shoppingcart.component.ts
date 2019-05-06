import { Component, OnInit } from '@angular/core';
import { Cart} from "../../../models/products/cart";
import {Observable} from "rxjs";
import {Product} from "../../../models/products/product";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  cart$: Observable<Cart>;
  cart: Cart = new Cart();

  constructor() { }

  ngOnInit() {

    // LOAD SHOPPING CART FROM SERVICE HERE.

    // MOVE OBSERVABLE DATA TO CART OBJECT

    // COMPUTATIONS FROM OBSERVABLE TO CART CLIENT-SIDE REDUCES STRAIN ON SERVER

    // for each in cart$ -> cart.add (product)
  }
}
