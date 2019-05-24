import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../services/product/plan.service';
import {Plan} from '../../../models/products/plan';
import {Cart} from '../../../models/products/cart';
import {User} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  private plans: Plan[];
  private cart: Cart;
  private user: User;

  constructor(private planService: PlanService,
              private userSessionService: UserSessionService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.cart = new Cart();
    this.planService.getPlans().subscribe(plans =>
      this.plans = plans.sort((a, b) => (a.speed < b.speed) ? -1 : 1));
    this.userSessionService.getUserDoc().subscribe(user => {
      if (user) {
        this.user = user;
        this.cart = Cart.clone(user.cart);
      } else {
        const tempCart = JSON.parse(this.cookieService.get('cart')) as Cart;
        this.cart = Cart.clone(tempCart);
        console.log(this.cart);
      }
    });
  }

  addPlan(plan: Plan) {
    this.cart.addPlan(plan);
    this.cookieService.set('cart', JSON.stringify(this.cart));
    if (this.user) {
      this.userSessionService.updateCart(this.cart);
    }
  }
}
