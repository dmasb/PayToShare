import { Component, OnInit } from '@angular/core';
import {Cart, ICart} from "../../../../models/products/cart";
import {AuthService} from "../../../../services/authentication/auth.service";
import {Observable} from "rxjs";
import {IUser} from "../../../../models/user";

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.scss']
})
export class OrderConfirmedComponent implements OnInit {

  private user$: Observable<IUser>;
  private cart = new Cart();

  constructor(private checkout: AuthService) { }

  ngOnInit() {
    this.user$ = this.checkout.getCurrentUser();
  }

}
