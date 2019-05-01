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

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  private tags: Observable<Tag[]>;
  private formats: Observable<Format[]>;
  private selectedTags: string[] = [];

  private newProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productTag: new FormControl(''),
    productFormat: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl('')
  });

  constructor(private productsService: ProductsService,
              private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService) {
  }

  ngOnInit() {
    this.formats = this.formatService.getFormats();
    this.tags = this.tagService.getTags();
  }

  pushTag() {
    const selected = this.newProductForm.controls.productTag.value;
    if (this.selectedTags.indexOf(selected) === -1 && selected) {
      this.selectedTags.push(selected);
    }
  }

  popTag(name: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== name);
  }

  addProduct() {
    const product: Product = {
      title: this.newProductForm.controls.productTitle.value,
      tags: this.selectedTags,
      format: this.newProductForm.controls.productFormat.value,
      description: this.newProductForm.controls.productDescription.value,
      price: this.newProductForm.controls.productPrice.value,
      quantity: this.newProductForm.controls.productQuantity.value
    };
    this.productsService.addProduct(product);
    this.selectedTags = [];
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
    return false;
  }
}
