import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "../../../services/user-session.service";
import {Cart} from "../../../models/products/cart";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartdropdown',
  templateUrl: './cartdropdown.component.html',
  styleUrls: ['./cartdropdown.component.scss']
})
export class CartdropdownComponent implements OnInit {

  private cart: Cart;

  constructor(private session: UserSessionService,private router: Router) {
  }


  ngOnInit() {
    this.cart = this.session.getCart();
  }



  ngOnDestroy(){
  }

  goToCart(){
    this.router.navigate(['/checkout']);
  }
}
