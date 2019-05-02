import {Component, OnInit, Input} from '@angular/core';
import {License} from '../../../../../models/products/license';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {
  @Input() private title: string;
  @Input() private speed: number;
  @Input() private charge: number;
  @Input() private licenses: License[];
  @Input() private description: string;

  constructor() {
  }

  ngOnInit() {
  }

}

/*
This plans is specifically tailored for nerds, especially those who play nab moba-like games and like to share garbage memes */
