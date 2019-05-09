import {Component, OnInit, Input} from '@angular/core';
import {Plan} from '../../../../../models/products/plan';
import {License} from '../../../../../models/products/license';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {
  @Input() private plan: Plan;
  @Input() private selectedLicenses: License[];
  constructor() {
  }

  ngOnInit() {
  }

}
