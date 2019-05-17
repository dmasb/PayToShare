import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/user-session.service';
import { Cart } from 'src/app/models/products/cart';
import { Product } from 'src/app/models/products/product';
import {User} from "../../../../../models/user";
import {Router} from '@angular/router';


@Component({
  selector: 'app-mypage-mycart',
  templateUrl: './mypage-mycart.component.html',
  styleUrls: ['./mypage-mycart.component.scss']
})
export class MypageMycartComponent implements OnInit {
  private cart: Cart = new Cart();
  

  constructor(private session: UserSessionService, private router: Router) { }

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
  goToCart() {
    this.router.navigate(['/checkout']);
  }

}