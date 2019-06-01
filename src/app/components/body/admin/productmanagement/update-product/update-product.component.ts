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
import {UploadImageService} from '../../../../../services/upload-image.service';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  @Input() product: Product;

  private tags: Tag[];
  private formats: Format[];
  private selectedTags: Tag[] = [];

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
    if (this.updateProductForm.controls.productTag.value) {
      const selected: Tag = JSON.parse(this.updateProductForm.controls.productTag.value);
      if (this.selectedTags.findIndex(tag => tag.id === selected.id) === -1 && selected.id) {
        this.selectedTags.push(selected);
      }
    }
  }

  popTag(selectedTag: Tag) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== selectedTag);
  }


  editProduct() {
    const newProduct: Product = cloneDeep(this.product);

    const selectedFormat = this.updateProductForm.controls.productFormat.value;
    let format: Format = null;

    if (selectedFormat) {
      format = JSON.parse(selectedFormat);
    }

    newProduct.title = this.updateProductForm.controls.productTitle.value || this.product.title;
    newProduct.tags = this.selectedTags;
    newProduct.format = format || this.product.format;
    newProduct.description = this.updateProductForm.controls.productDescription.value || this.product.description;
    newProduct.price = this.updateProductForm.controls.productPrice.value || this.product.price;
    newProduct.quantity = this.updateProductForm.controls.productQuantity.value || this.product.quantity;

    if (this.getImageUrl()) {
      newProduct.imageUrl = this.getImageUrl();
    }

    this.productService.update(this.product, newProduct);
    this.modalService.dismissAll();
    this.updateProductForm.reset();
    this.selectedTags = [];
  }

  openCenteredDialog(addProductModal) {
    this.selectedTags = this.product.tags;
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

  getImageUrl() {
    return this.uploadImageService.getImageUrl();
  }
}
