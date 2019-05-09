import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../../services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

}
