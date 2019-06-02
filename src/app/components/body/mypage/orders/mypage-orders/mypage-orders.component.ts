import {Component, OnInit, Input} from '@angular/core';
import {ProcessorderService} from '../../../../../services/mail/processorder.service';
import {Order} from '../../../../../models/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mypage-orders',
  templateUrl: './mypage-orders.component.html',
  styleUrls: ['./mypage-orders.component.scss']
})
export class MypageOrdersComponent implements OnInit {

  @Input() private uid: string;
  private orders: Order[];

  constructor(private router: Router,
              private orderService: ProcessorderService) {
  }

  ngOnInit() {
    if (this.uid) {
      this.orderService.getOrders(this.uid).subscribe(orders => {
        this.orders = orders.sort((a, b) => (a.created < b.created) ? 1 : -1);
      });
    }
  }

  viewOrder(id: string) {
    this.router.navigate([`order/${id}`]);
  }

  orderDate() {
    if (this.orders[0].created < this.orders[this.orders.length - 1].created) {
      this.orders.sort((a, b) => (a.created > b.created ? -1 : 1));
    } else {
      this.orders.sort((a, b) => (a.created < b.created ? -1 : 1));
    }
  }

  orderProducts() {
    if (this.orders[0].cart.numberOfItems < this.orders[this.orders.length - 1].cart.numberOfItems) {
      this.orders.sort((a, b) => (a.cart.numberOfItems > b.cart.numberOfItems ? -1 : 1));
    } else {
      this.orders.sort((a, b) => (a.cart.numberOfItems < b.cart.numberOfItems ? -1 : 1));
    }
  }

  orderPrice() {
    if (this.orders[0].cart.totalPrice < this.orders[this.orders.length - 1].cart.totalPrice) {
      this.orders.sort((a, b) => (a.cart.totalPrice > b.cart.totalPrice ? -1 : 1));
    } else {
      this.orders.sort((a, b) => (a.cart.totalPrice < b.cart.totalPrice ? -1 : 1));
    }
  }
}
