import { Component, OnInit } from '@angular/core';
import {PlanService} from '../../../services/product/plan.service';
import {Observable} from 'rxjs';
import {Plan} from '../../../models/products/plan';

@Component({
  selector: 'app-weeklydeals',
  templateUrl: './weeklydeals.component.html',
  styleUrls: ['./weeklydeals.component.scss']
})
export class WeeklydealsComponent implements OnInit {

  private plans: Observable<Plan[]>;
  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.plans = this.planService.getPlans();
  }

}
