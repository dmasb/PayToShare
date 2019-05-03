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

  private tempPlan: Plan = {
    title: 'Xtreme plus',
    speed: 2000,
    price: 99,
    licenses: null,
    description: 'This plans is specifically tailored for nerds, especially those who ' +
      'play nab moba-like games and like to share garbage memes ',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com/o/' +
      'productImage%2Fitemimg.svg?alt=media&token=130ed9f0-6e1a-4d93-abf3-62d77de18599'
  };

  private licenses: Observable<License[]>;
  private selectedLicenses: License[] = [];
  private newPlanForm = new FormGroup({
    planName: new FormControl(''),
    planSpeed: new FormControl(''),
    planPrice: new FormControl(''),
    planDesc: new FormControl(''),
    planLicense: new FormControl(''),
    productImageUrl: new FormControl('')
  });

  constructor(private licenseService: LicenseService,
              private planService: PlanService,
              private uploadImageService: UploadImageService) {
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
    console.log(selected.tagRef.name);
    this.selectedLicenses.forEach(s => console.log(s));
    console.log('###############################################');
  }

  popLicense(selectedLicense: License) {
    this.selectedLicenses = this.selectedLicenses.filter(license => license !== selectedLicense);
  }

  createPlan() {

    this.tempPlan.title = this.newPlanForm.controls.planName.value;
    this.tempPlan.speed = this.newPlanForm.controls.planSpeed.value;
    this.tempPlan.price = this.newPlanForm.controls.planPrice.value;
    this.tempPlan.description = this.newPlanForm.controls.planDesc.value;
    this.tempPlan.licenses = this.selectedLicenses;
    this.tempPlan.imageUrl = this.getImageUrl() || this.tempPlan.imageUrl;

    this.planService.addPlan(this.tempPlan);
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
