import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../models/products/product';
import {ProductsService} from '../../../../../services/crud/products.service';
import {TagService} from '../../../../../services/product/tag.service';
import {Tag} from '../../../../../models/products/tag';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProductComponent implements OnInit {

  private tags: Tag[];
  private selectedTags: string[] = [];

  private newProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productTag: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl('')

  });

  constructor(private productsService: ProductsService, private modalService: NgbModal, private tagService: TagService) {
    this.tagService.getTags().subscribe(tag => {
      this.tags = tag.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Tag;
      });
    });
  }

  ngOnInit() {
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
