import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/user-session.service';
import { Cart } from 'src/app/models/products/cart';
import { Product } from 'src/app/models/products/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private cart: Cart;

  constructor(private session: UserSessionService) { }

  ngOnInit() {
    this.cart = this.session.getCart();
    
  }
  increaseQuantity(product: Product){
    this.session.addToCart(product);
  }
  decreaseQuantity(product: Product){
    this.session.removeFromCart(product);
  }
  removeAll(product: Product){
    this.session.removeAllOfProduct(product);
  }

}
