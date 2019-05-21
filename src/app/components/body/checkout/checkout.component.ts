import { Component, OnInit } from '@angular/core';
import {Cart, ICart} from "../../../models/products/cart";
import {AuthService} from "../../../services/authentication/auth.service";
import {Observable} from "rxjs";
import {IUser} from "../../../models/user";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private user$: Observable<IUser>;
  private cart = new Cart();

  constructor(private checkout: AuthService) { }

  ngOnInit() {
    this.user$ = this.checkout.getCurrentUser();
  }

}
