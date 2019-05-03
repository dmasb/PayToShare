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

  private tags: Observable<Tag[]>;
  private formats: Observable<Format[]>;
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
    this.formats = this.formatService.getFormats();
    this.tags = this.tagService.getTags();
  }

  pushTag() {

    const selected: Tag = JSON.parse(this.newProductForm.controls.productTag.value);
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

  addProduct() {
    const product: Product = {
      title: this.newProductForm.controls.productTitle.value,
      tags: this.selectedTags,
      format: this.newProductForm.controls.productFormat.value,
      description: this.newProductForm.controls.productDescription.value,
      price: this.newProductForm.controls.productPrice.value,
      quantity: this.newProductForm.controls.productQuantity.value,
      imageUrl: this.getImageUrl() || 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com/o/' +
        'productImage%2Fitemimg.svg?alt=media&token=130ed9f0-6e1a-4d93-abf3-62d77de18599'
    };
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
