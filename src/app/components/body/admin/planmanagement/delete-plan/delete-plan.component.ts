import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PlanService} from '../../../../../services/product/plan.service';
import {Plan} from '../../../../../models/products/plan';

@Component({
  selector: 'app-delete-plan',
  templateUrl: './delete-plan.component.html',
  styleUrls: ['./delete-plan.component.scss']
})

export class DeletePlanComponent implements OnInit {

  @Input() private plan: Plan;

  constructor(private planService: PlanService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeletePlan) {
    this.modalService.open(confirmDeletePlan, {centered: true});
  }

  confirmDelete() {
    this.planService.confirmDelete(this.plan);
  }
}
