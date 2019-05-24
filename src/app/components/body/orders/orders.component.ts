import { Component, OnInit, Input} from '@angular/core';
import {UserSessionService} from '../../../services/user-session.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Input() private

  constructor() { }

  ngOnInit() {
  }

}
