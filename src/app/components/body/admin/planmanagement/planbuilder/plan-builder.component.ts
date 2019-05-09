import {Component, OnInit} from '@angular/core';
import {Plan} from '../../../../../models/products/plan';
import {Observable} from 'rxjs';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';
import {FormControl, FormGroup} from '@angular/forms';
import {PlanService} from '../../../../../services/product/plan.service';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import * as url from 'url';
import {UploadImageService} from '../../../../../services/upload-image.service';

@Component({
  selector: 'app-plan-builder',
  templateUrl: './plan-builder.component.html',
  styleUrls: ['./plan-builder.component.scss']
})
export class PlanBuilderComponent implements OnInit {

  private plan: Plan;
  private licenses: License[];
  private selectedLicenses: License[] = [];

  private newPlanForm = new FormGroup({
    planName: new FormControl(''),
    planSpeed: new FormControl(''),
    planPrice: new FormControl(''),
    planQuantity: new FormControl(''),
    planDesc: new FormControl(''),
    planLicense: new FormControl(''),
    productImageUrl: new FormControl('')
  });

  constructor(private licenseService: LicenseService,
              private planService: PlanService,
              private uploadImageService: UploadImageService) {
    this.plan = new Plan();
  }

  ngOnInit() {
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
  }

  pushLicense() {
    if (this.newPlanForm.controls.planLicense.value) {
      const selected: License = JSON.parse(this.newPlanForm.controls.planLicense.value);
      if (this.selectedLicenses.findIndex(obj => obj.id === selected.id) === -1 && selected.id) {
        this.selectedLicenses.push(selected);
      }
    }
  }

  popLicense(selectedLicense: License) {
    this.selectedLicenses = this.selectedLicenses.filter(license => license !== selectedLicense);
  }

  createPlan() {
    const licenses: string[] = [];
    this.selectedLicenses.forEach(licence => licenses.push(licence.id));

    this.plan.title = this.newPlanForm.controls.planName.value;
    this.plan.speed = this.newPlanForm.controls.planSpeed.value;
    this.plan.price = this.newPlanForm.controls.planPrice.value;
    this.plan.quantity = this.newPlanForm.controls.planQuantity.value;
    this.plan.description = this.newPlanForm.controls.planDesc.value;
    this.plan.licenseIDs = licenses;
    this.plan.imageUrl = this.getImageUrl() || this.plan.imageUrl;
    this.planService.addPlan(this.plan);
    this.newPlanForm.reset();
    this.selectedLicenses = [];
  }

  /*
  ALL BELOW IS IMAGE RELATED
   */
  uploadImage(fileInput: Event) {
    const target = fileInput.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.uploadImageService.startUpload(file, 'productImage');
  }

  getTask(): AngularFireUploadTask {
    return this.uploadImageService.getTask();
  }

  getSnapshot(): Observable<UploadTaskSnapshot> {
    return this.uploadImageService.getSnapshot();
  }

  getPercentage(): Observable<number> {
    return this.uploadImageService.getPercentage();
  }

  getImageUrl(): url {
    return this.uploadImageService.getImageUrl();
  }
}
