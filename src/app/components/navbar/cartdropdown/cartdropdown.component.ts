import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';
import {Cart} from "../../../models/products/cart";
import {Router} from '@angular/router';

@Component({
  selector: 'app-cartdropdown',
  templateUrl: './cartdropdown.component.html',
  styleUrls: ['./cartdropdown.component.scss']
})
export class CartdropdownComponent implements OnInit {

  private cart = new Cart();

  constructor(private userSession: UserSessionService, private router: Router) {
  }

  ngOnInit() {
    this.userSession.getUserDoc().subscribe(user => this.cart = Cart.clone(user.cart));
  }

  goToCart() {
    this.router.navigate(['/checkout']);
  }

}
