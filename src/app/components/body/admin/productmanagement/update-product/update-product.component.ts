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

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() selectedTags: string[];
  @Input() format: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() description: string;

  private tags: Observable<Tag[]>;
  private formats: Observable<Format[]>;

  updateProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productTag: new FormControl(''),
    productFormat: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl('')
  });

  constructor(private productService: ProductsService,
              private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService) {
  }

  ngOnInit() {
    this.formats = this.formatService.getFormats();
    this.tags = this.tagService.getTags();
  }


  popTag(name: string) {
    this.selectedTags = this.selectedTags.filter(tag => tag !== name);
  }

  pushTag() {
    const selected = this.updateProductForm.controls.productTag.value;
    if (this.selectedTags.indexOf(selected) === -1 && selected) {
      this.selectedTags.push(selected);
    }
  }

  editProduct() {
    const product: Product = {
      id: this.id,
      title: this.updateProductForm.controls.productTitle.value,
      tags: this.selectedTags,
      format: this.updateProductForm.controls.productFormat.value || this.format,
      description: this.updateProductForm.controls.productDescription.value,
      price: this.updateProductForm.controls.productPrice.value,
      quantity: this.updateProductForm.controls.productQuantity.value
    };
    this.productService.update(product);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
  }
}
