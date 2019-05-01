import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductsService} from '../../../../../services/crud/products.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../models/products/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() tags: string[];
  @Input() price: number;
  @Input() quantity: number;
  @Input() description: string;

  editProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productTag: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl('')
  });

  constructor(private productService: ProductsService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  editProduct() {
    const product: Product = {
      id: this.id,
      title: this.editProductForm.controls.productTitle.value,
      description: this.editProductForm.controls.productDescription.value,
      price: this.editProductForm.controls.productPrice.value,
      quantity: this.editProductForm.controls.productQuantity.value
    };
    this.productService.update(product);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addProductModal) {
    this.modalService.open(addProductModal, {centered: true});
  }
}
