import {Component, OnInit} from '@angular/core';
import {Plan} from '../../../../../models/products/plan';
import {Observable} from 'rxjs';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';
import {FormControl, FormGroup} from '@angular/forms';
import {PlanService} from '../../../../../services/product/plan.service';

@Component({
  selector: 'app-plan-builder',
  templateUrl: './plan-builder.component.html',
  styleUrls: ['./plan-builder.component.scss']
})
export class PlanBuilderComponent implements OnInit {

  private tempPlan: Plan = {
    title: 'Xtreme plus',
    speed: 2000,
    price: 99,
    licenses: null,
    description: 'This plans is specifically tailored for nerds, especially those who ' +
      'play nab moba-like games and like to share garbage memes ',
    imageUrl: 'www.www.www'
  };

  private licenses: Observable<License[]>;
  private selectedLicenses: License[] = [];
  private newPlanForm = new FormGroup({
    planName: new FormControl(''),
    planSpeed: new FormControl(''),
    planPrice: new FormControl(''),
    planDesc: new FormControl(''),
    planLicense: new FormControl(''),
  });

  constructor(private licenseService: LicenseService,
              private planService: PlanService) {
  }

  ngOnInit() {
    this.licenses = this.licenseService.getLicenses();
  }

  pushLicense() {

    const selected: License = JSON.parse(this.newPlanForm.controls.planLicense.value);
    if (this.selectedLicenses.findIndex(obj => obj.id === selected.id) === -1 && selected.id) {
      this.selectedLicenses.push(selected);
    }

    console.log('###############################################');
    console.log(selected.tagRef[0].name);
    this.selectedLicenses.forEach(s => console.log(s));
    console.log('###############################################');
  }

  popLicense(selectedLicense: License) {
    this.selectedLicenses = this.selectedLicenses.filter(license => license !== selectedLicense);
  }

  createPlan() {
    console.log('CLICKED');
    this.tempPlan.title = this.newPlanForm.controls.planName.value;
    this.tempPlan.speed = this.newPlanForm.controls.planSpeed.value;
    this.tempPlan.price = this.newPlanForm.controls.planPrice.value;
    this.tempPlan.description = this.newPlanForm.controls.planDesc.value;
    this.tempPlan.licenses = this.selectedLicenses;
    this.planService.addPlan(this.tempPlan);
  }
}
