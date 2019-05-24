import {Component, OnInit} from '@angular/core';
import {UserSessionService} from '../../../services/user-session.service';
import {Cart} from '../../../models/products/cart';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-cartdropdown',
  templateUrl: './cartdropdown.component.html',
  styleUrls: ['./cartdropdown.component.scss']
})
export class CartdropdownComponent implements OnInit {

  private cart: Cart;

  constructor(private userSession: UserSessionService,
              private router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.userSession.getUserDoc().subscribe(user => {
      if (user) {
        this.cart = Cart.clone(user.cart);
      } else {
        const tempCart = JSON.parse(this.cookieService.get('cart')) as Cart;
        this.cart = Cart.clone(tempCart);
      }
    });
  }

  goToCart() {
    this.router.navigate(['/checkout']);
  }

}
