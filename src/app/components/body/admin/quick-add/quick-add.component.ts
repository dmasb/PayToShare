import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../../models/product';
import {ProductsService} from '../../../../services/crud/products.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.scss']
})
export class QuickAddComponent {
  newQuickProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productCategory: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl('')

  });

  closeResult: string;

  constructor(private productsService: ProductsService, private modalService: NgbModal) {
  }


  addProduct() {
    const product: Product = {
      title: this.newQuickProductForm.controls.productTitle.value,
      category: this.newQuickProductForm.controls.productCategory.value,
      description: this.newQuickProductForm.controls.productDescription.value,
      price: this.newQuickProductForm.controls.productPrice.value,
      quantity: this.newQuickProductForm.controls.productQuantity.value
    };
    this.productsService.addProduct(product);
    this.modalService.dismissAll();
  }

  openVerticallyCentered(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
  }


}
