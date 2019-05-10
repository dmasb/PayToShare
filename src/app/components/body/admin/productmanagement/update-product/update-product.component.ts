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

    const productTagIDs: string[] = [];
    this.selectedTags.forEach(tag => productTagIDs.push(tag.id));

    this.product.title = this.updateProductForm.controls.productTitle.value;
    this.product.tagIDs = productTagIDs;
    this.product.formatID = this.updateProductForm.controls.productFormat.value || this.product.formatID;
    this.product.description = this.updateProductForm.controls.productDescription.value;
    this.product.price = this.updateProductForm.controls.productPrice.value;
    this.product.quantity = this.updateProductForm.controls.productQuantity.value;

    if (this.getImageUrl()) {
      this.product.imageUrl = this.getImageUrl();
    }

    this.productService.update(this.product);
    this.modalService.dismissAll();
    this.updateProductForm.reset();
    this.selectedTags = [];
  }

  openCenteredDialog(addProductModal) {
    this.selectedTags = this.tags.filter(tag => this.product.tagIDs.includes(tag.id));
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
