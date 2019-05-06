import { Component, OnInit } from '@angular/core';
import {PlanService} from '../../../../../services/product/plan.service';
import {Plan} from '../../../../../models/products/plan';

@Component({
  selector: 'app-plan-overview',
  templateUrl: './plan-overview.component.html',
  styleUrls: ['./plan-overview.component.scss']
})
export class PlanOverviewComponent implements OnInit {
  private plans: Plan[];
  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(plans => this.plans = plans);
  }

}
