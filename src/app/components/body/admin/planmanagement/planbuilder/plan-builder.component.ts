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
import {DefaultLicenses} from '../../../../../models/products/defaultLicenses';
import {Level, PlanLevels} from '../../../../../models/products/planLevels';

@Component({
  selector: 'app-plan-builder',
  templateUrl: './plan-builder.component.html',
  styleUrls: ['./plan-builder.component.scss']
})
export class PlanBuilderComponent implements OnInit {
  private planLevels: PlanLevels;
  private defaultLicenses: DefaultLicenses;
  private plan: Plan;
  private licenses: License[];
  private selectedLicenses: string[] = [];

  private newPlanForm = new FormGroup({
    planName: new FormControl(''),
    planSpeed: new FormControl(''),
    planPrice: new FormControl(''),
    planDesc: new FormControl(''),
    planLevel: new FormControl(''),
    planLicense: new FormControl(''),
    productImageUrl: new FormControl('')
  });

  constructor(private licenseService: LicenseService,
              private planService: PlanService,
              private uploadImageService: UploadImageService) {
    this.plan = new Plan();
    this.planLevels = new PlanLevels();
    this.defaultLicenses = new DefaultLicenses();
  }

  ngOnInit() {
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
  }

  selectLevel() {
    const selectedLevel: Level = JSON.parse(this.newPlanForm.controls.planLevel.value);
    this.plan.level = selectedLevel;
    while (this.selectedLicenses.length > selectedLevel.licenses) {
      this.selectedLicenses.pop();
    }
  }

  pushLicense() {

    if (this.newPlanForm.controls.planLevel.value && this.newPlanForm.controls.planLicense.value) {
      const selectedLevel: Level = JSON.parse(this.newPlanForm.controls.planLevel.value);
      const selectedLicense = this.newPlanForm.controls.planLicense.value;
      if (this.selectedLicenses.findIndex(obj => obj === selectedLicense) === -1
        && this.selectedLicenses.length < selectedLevel.licenses) {
        this.selectedLicenses.push(selectedLicense);
      }
    }
  }

  popLicense(selectedLicense: string) {
    this.selectedLicenses = this.selectedLicenses.filter(license => license !== selectedLicense);
  }

  createPlan() {

    this.plan.title = this.newPlanForm.controls.planName.value;
    this.plan.speed = this.newPlanForm.controls.planSpeed.value;
    this.plan.level = JSON.parse(this.newPlanForm.controls.planLevel.value) as Level;
    this.plan.price = this.newPlanForm.controls.planPrice.value;
    this.plan.description = this.newPlanForm.controls.planDesc.value;
    this.plan.defaultLicenses = this.selectedLicenses;
    this.plan.licenses = [];
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
