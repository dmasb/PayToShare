import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../../../../services/crud/products.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../models/products/product';
import {Tag} from '../../../../../models/products/tag';
import {TagService} from '../../../../../services/product/tag.service';
import {Format} from '../../../../../models/products/format';
import {FormatService} from '../../../../../services/product/format.service';
import {Observable} from 'rxjs';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import * as url from 'url';
import {UploadImageService} from '../../../../../services/upload-image.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() selectedTags: Tag[];
  @Input() format: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() description: string;
  @Input() imageUrl: string; //

  private tags: Tag[];
  private formats: Format[];

  updateProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productTag: new FormControl(''),
    productFormat: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl(''),
    productImageUrl: new FormControl('') //
  });

  constructor(private productService: ProductsService,
              private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService,
              private uploadImageService: UploadImageService
  ) {
  }

  ngOnInit(): void {
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  pushTag() {
    const selected: Tag = JSON.parse(this.updateProductForm.controls.productTag.value);
    if (this.selectedTags.findIndex(obj => obj.id === selected.id) === -1 && selected.id) {
      this.selectedTags.push(selected);
    }
    console.log('###############################################');
    this.selectedTags.forEach(s => console.log(s));
    console.log('###############################################');

  }

  popTag(selectedTag: object) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== selectedTag);
  }


  editProduct() {

    const product: Product = {
      id: this.id,
      title: this.updateProductForm.controls.productTitle.value,
      tags: this.selectedTags,
      format: this.updateProductForm.controls.productFormat.value || this.format,
      description: this.updateProductForm.controls.productDescription.value,
      price: this.updateProductForm.controls.productPrice.value,
      quantity: this.updateProductForm.controls.productQuantity.value,
    };

    if (this.getImageUrl()) {
      product.imageUrl = this.getImageUrl();
    }

    this.productService.update(product);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
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
