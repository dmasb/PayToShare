import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "../../../../../services/user-session.service";
import {Cart} from "../../../../../models/products/cart";


@Component({
  selector: 'app-mypage-mycart',
  templateUrl: './mypage-mycart.component.html',
  styleUrls: ['./mypage-mycart.component.scss']
})
export class MypageMycartComponent implements OnInit {
  private cart: Cart;

  constructor(private session: UserSessionService) { }

  ngOnInit() {
    this.cart = this.session.getCart();
  }

}
