import { Component, OnInit } from '@angular/core';
import {Order} from '../../../../../models/order';
import {ProcessorderService} from '../../../../../services/mail/processorder.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  private order: Order;

  constructor(private route: ActivatedRoute,
              private orderService: ProcessorderService) { }

  ngOnInit() {
    this.orderService.getOrder(this.route.snapshot.paramMap.get('id')).subscribe(order => this.order = order);
  }

  getOrderDetails(): Order {
    return this.order;
  }
}
