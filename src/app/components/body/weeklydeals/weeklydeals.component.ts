import { Component, OnInit } from '@angular/core';
import {Plan} from '../../../models/products/plan';
import { UserSessionService } from 'src/app/services/user-session.service';
import { Product } from 'src/app/models/products/product';

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
