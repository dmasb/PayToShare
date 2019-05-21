import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/user-session.service';
import { Cart } from 'src/app/models/products/cart';
import { Product } from 'src/app/models/products/product';
import {User} from "../../../../models/user";
import {ProcessorderService} from "../../../../services/mail/processorder.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private cart: Cart = new Cart();

  constructor(private orderService: ProcessorderService, private session: UserSessionService) { }

  ngOnInit() {
    this.session.getUserDoc().subscribe(user => {

      this.cart= Cart.clone(user.cart);
    });

  }

  // GET CART FROM DB

  // UPDATE LOCALLY

  // UPDATE CART


  increaseQuantity(product: Product){
    this.cart.add(product);
    this.session.updateCart(this.cart);
  }
  decreaseQuantity(product: Product){
    this.cart.remove(product);
    this.session.updateCart(this.cart);
  }
  removeAll(product: Product){
    this.cart.removeAllOf(product);
    this.session.updateCart(this.cart);
  }

  process(){
    this.orderService.processOrder();
  }

}
