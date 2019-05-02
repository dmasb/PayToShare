import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PlanService} from '../../../../../services/product/plan.service';

@Component({
  selector: 'app-delete-plan',
  templateUrl: './delete-plan.component.html',
  styleUrls: ['./delete-plan.component.scss']
})

export class DeletePlanComponent implements OnInit {

  @Input() private id: string;
  @Input() private title: string;

  constructor(private planService: PlanService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeletePlan) {
    this.modalService.open(confirmDeletePlan, {centered: true});
  }

  requestDeleteTag(planID) {
    this.planService.available(planID);
  }

  confirmDelete() {
    this.planService.remove();
  }

  cancelDelete() {
    this.planService.cancel();
  }
}
