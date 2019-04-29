import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-plan-builder',
  templateUrl: './plan-builder.component.html',
  styleUrls: ['./plan-builder.component.scss']
})
export class PlanBuilderComponent implements OnInit {
  private plan = {
    title: 'Title',
    speed: 0,
    charge: 0,
    description: '...'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
