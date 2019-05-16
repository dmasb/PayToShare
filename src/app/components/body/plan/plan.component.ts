import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../services/product/plan.service';
import {Plan} from '../../../models/products/plan';
import {Level} from '../../../models/products/planLevels';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  private plans: Plan[];

  constructor(private planService: PlanService) {
  }

  ngOnInit() {
    this.planService.getPlans().subscribe(plans => this.plans = plans);
  }

  stringifyLevel(level: string): Level {
    return JSON.parse(level) as Level;
  }

}
