import { Component, OnInit } from '@angular/core';
import {PlanService} from '../../../services/product/plan.service';
import {Plan} from '../../../models/products/plan';
import {Product} from "../../../models/products/product";
import {UserSessionService} from "../../../services/user-session.service";

@Component({
  selector: 'app-weeklydeals',
  templateUrl: './weeklydeals.component.html',
  styleUrls: ['./weeklydeals.component.scss']
})
export class WeeklydealsComponent implements OnInit {

  private salePlans: Plan[];
  constructor(private planService: PlanService, private session: UserSessionService) { }

  ngOnInit() {
    this.planService.getSalePlans().subscribe(salePlans => this.salePlans = salePlans);
  }
  add(product: Product) {
    this.session.addToCart(product);
  }
}
