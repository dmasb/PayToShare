import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {
  @Input() private title: string;
  @Input() private speed: number;
  @Input() private charge: number;
  @Input() private description: string;

  constructor() {
  }

  ngOnInit() {
  }

}
