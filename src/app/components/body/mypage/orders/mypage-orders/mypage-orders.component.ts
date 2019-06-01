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
}
