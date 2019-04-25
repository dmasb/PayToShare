import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../models/product';
import {ProductsService} from '../../../../../services/crud/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProductComponent implements OnInit {
  newProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productCategory: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl('')

  });
  closeResult: string;

  constructor(private productsService: ProductsService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  addProduct() {
    const product: Product = {
      title: this.newProductForm.controls.productTitle.value,
      category: this.newProductForm.controls.productCategory.value,
      description: this.newProductForm.controls.productDescription.value,
      price: this.newProductForm.controls.productPrice.value,
      quantity: this.newProductForm.controls.productQuantity.value
    };
    this.productsService.addProduct(product);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
  }
}
