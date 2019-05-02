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
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {finalize, map} from "rxjs/operators";

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
              private storage: AngularFireStorage) {
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
      // imageUrl: this.downloadURL.pipe(map(o=> {return o}))
    };
    this.productsService.addProduct(product);
    this.selectedTags = [];
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
    return false;
  }

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;
  // File
  file;

  // Download URL
  downloadURL: Observable<string>;


  getFile(event) {
    this.file = event.target.files[0];
  }

  startUpload() {


    // Client-side validation example
    if (this.file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `productImage/${new Date().getTime()}_${this.file.name}`;


    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();

    // The file's download URL
    this.snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
  }
}
