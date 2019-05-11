import { Component, OnInit } from '@angular/core';
import {Plan} from '../../../models/products/plan';

@Component({
  selector: 'app-weeklydeals',
  templateUrl: './weeklydeals.component.html',
  styleUrls: ['./weeklydeals.component.scss']
})
export class WeeklydealsComponent implements OnInit {

  private salePlans: Plan[];
  constructor() { }

  ngOnInit() {
  }
}
