import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../services/product/plan.service';
import {Plan} from '../../../models/products/plan';
import {Cart} from '../../../models/products/cart';
import {User} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';
import {Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
    this.planService.getPlans().subscribe(plans =>
      this.plans = plans.sort((a, b) => (a.speed < b.speed) ? -1 : 1));
    this.userSessionService.getUserDoc().subscribe(user => {
      if (user) {
        this.user = user;
        this.cart = Cart.clone(user.cart);
      }
    });
  }

  addPlan(plan: Plan) {
    if (!this.cart) {
      this.router.navigate(['/register']);
    } else {
      this.cart.addPlan(plan);
      this.userSessionService.updateCart(this.cart);
    }
  }
}
