import * as url from 'url';
import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../../../../models/products/tag';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {Format} from '../../../../../models/products/format';
import {License} from '../../../../../models/products/license';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import {TagService} from '../../../../../services/product/tag.service';
import {FormatService} from '../../../../../services/product/format.service';
import {LicenseService} from '../../../../../services/product/license.service';
import {UploadImageService} from '../../../../../services/upload-image.service';

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.scss']
})
export class AddLicenseComponent implements OnInit {

  private tags: Tag[];
  private formats: Format[];

  newLicenseForm = new FormGroup({
    licenseName: new FormControl(''),
    format: new FormControl(''),
    tag: new FormControl(''),
    licenseQuantity: new FormControl(''),
    licenseDescription: new FormControl(''),
    licensePrice: new FormControl(''),
    licenseImageUrl: new FormControl('')
  });

  constructor(private licenseService: LicenseService,
              private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService,
              private uploadImageService: UploadImageService) {
  }

  ngOnInit() {
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  addLicense() {
    const rawFormat = this.newLicenseForm.controls.format.value;
    const rawTag = this.newLicenseForm.controls.tag.value;

    const format: Format = JSON.parse(rawFormat);
    const tag: Tag = JSON.parse(rawTag);

    const license = new License();
    license.tag = tag;
    license.format = format;
    license.title = this.newLicenseForm.controls.licenseName.value;
    license.price = this.newLicenseForm.controls.licensePrice.value;
    license.quantity = this.newLicenseForm.controls.licenseQuantity.value;
    license.description = this.newLicenseForm.controls.licenseDescription.value;
    license.imageUrl = this.getImageUrl() || license.imageUrl;

    this.licenseService.addLicense(license);
    this.newLicenseForm.reset();
    this.modalService.dismissAll();
  }

  openCenteredDialog(addLicenseModal) {
    this.modalService.open(addLicenseModal, {centered: true});
    return false;
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
