import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Tag} from '../../../../../models/products/tag';
import {TagService} from '../../../../../services/product/tag.service';
import {Format} from '../../../../../models/products/format';
import {FormatService} from '../../../../../services/product/format.service';
import {Observable} from 'rxjs';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import * as url from 'url';
import {UploadImageService} from '../../../../../services/upload-image.service';
import * as cloneDeep from 'lodash/cloneDeep';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';

@Component({
  selector: 'app-update-license',
  templateUrl: './update-license.component.html',
  styleUrls: ['./update-license.component.scss']
})
export class UpdateLicenseComponent implements OnInit {

  @Input() private license: License;
  private tags: Tag[];
  private formats: Format[];

  private updateLicenseForm = new FormGroup({
    licenseName: new FormControl(''),
    licenseQuantity: new FormControl(''),
    licenseFormat: new FormControl(''),
    licenseTag: new FormControl(''),
    licensePrice: new FormControl(''),
    licenseDescription: new FormControl(''),
    licenseImageUrl: new FormControl('') //
  });

  constructor(private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService,
              private uploadImageService: UploadImageService,
              private licenseService: LicenseService) {
  }

  ngOnInit() {
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  openCenteredDialog(addProductModal) {

    this.modalService.open(addProductModal, {centered: true});
  }

  editLicense() {
    const newLicense: License = cloneDeep(this.license);

    const selectedFormat = this.updateLicenseForm.controls.licenseFormat.value;
    const selectedTag = this.updateLicenseForm.controls.licenseTag.value;

    let format;
    let tag;

    if (selectedFormat) {
      format = JSON.parse(selectedFormat);
    }
    if (selectedTag) {
      tag = JSON.parse(selectedTag);
    }

    newLicense.title = this.updateLicenseForm.controls.licenseName.value || this.license.title;
    newLicense.tag = tag || this.license.tag;
    newLicense.format = format || this.license.format;
    newLicense.description = this.updateLicenseForm.controls.licenseDescription.value || this.license.description;
    newLicense.price = this.updateLicenseForm.controls.licensePrice.value || this.license.price;
    newLicense.quantity = this.updateLicenseForm.controls.licenseQuantity.value || this.license.quantity;

    if (this.getImageUrl()) {
      newLicense.imageUrl = this.getImageUrl();
    }

    this.licenseService.update(this.license, newLicense);
    this.modalService.dismissAll();
    this.updateLicenseForm.reset();
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
