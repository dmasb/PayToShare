import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../../../../services/crud/products.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';
import {Product} from '../../../../../models/products/product';
import {Format} from '../../../../../models/products/format';
import {FormatService} from '../../../../../services/product/format.service';
import {Observable} from 'rxjs';
import {AngularFireUploadTask} from '@angular/fire/storage';
import {UploadImageService} from '../../../../../services/upload-image.service';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';
import * as url from 'url';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  private tags: Tag[];
  private formats: Format[];
  private selectedTags: Tag[] = [];
  private newProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productTag: new FormControl(''),
    productFormat: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl(''),
    productImageUrl: new FormControl('')
  });


  constructor(private productsService: ProductsService,
              private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService,
              private uploadImageService: UploadImageService) {
  }

  ngOnInit() {
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  pushTag() {
    if (this.newProductForm.controls.productTag.value) {
      const selected: Tag = JSON.parse(this.newProductForm.controls.productTag.value);
      if (this.selectedTags.findIndex(obj => obj.id === selected.id) === -1 && selected.id) {
        this.selectedTags.push(selected);
      }
    }
  }

  popTag(selectedTag: Tag) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== selectedTag);
  }


  addProduct() {

    const productTags: string[] = [];
    this.selectedTags.forEach(tag => productTags.push(tag.id));
    const format: Format = JSON.parse(this.newProductForm.controls.productFormat.value);

    const product = new Product();
    product.title = this.newProductForm.controls.productTitle.value;
    product.tags = this.selectedTags;
    product.format = format;
    product.description = this.newProductForm.controls.productDescription.value;
    product.price = this.newProductForm.controls.productPrice.value;
    product.quantity = this.newProductForm.controls.productQuantity.value;
    product.imageUrl = this.getImageUrl() || product.imageUrl;


    this.productsService.addProduct(product);
    this.selectedTags = [];
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
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

