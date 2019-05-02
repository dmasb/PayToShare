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
  @Input() selectedTags: Tag[];
  @Input() format: string;
  @Input() price: number;
  @Input() quantity: number;
  @Input() description: string;
  @Input() imageUrl: string; //

  private tags: Observable<Tag[]>;
  private formats: Observable<Format[]>;

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
              private formatService: FormatService
              ) { //
  }

  ngOnInit(): void {
    this.formats = this.formatService.getFormats();
    this.tags = this.tagService.getTags();
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
     // imageUrl: string
    };
    this.productService.update(product);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
  }
}
