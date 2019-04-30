import {Component, OnInit, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductsService} from '../../../../../services/crud/products.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../../../../models/products/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateProductComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() category: string;
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
