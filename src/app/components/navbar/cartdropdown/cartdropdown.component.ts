import {Component, OnInit} from '@angular/core';
import {Cart, ICart} from "../../../models/products/cart";
import {AuthService} from "../../../services/authentication/auth.service";
import {Observable} from "rxjs";
import {IUser} from "../../../models/user";

@Component({
  selector: 'app-cartdropdown',
  templateUrl: './cartdropdown.component.html',
  styleUrls: ['./cartdropdown.component.scss']
})
export class CartdropdownComponent implements OnInit {

  private user$: Observable<IUser>;
  private cart = new Cart();

  constructor(private kuk: AuthService) {
  }

  ngOnInit() {
    this.user$ = this.kuk.getCurrentUser();
  }
}
