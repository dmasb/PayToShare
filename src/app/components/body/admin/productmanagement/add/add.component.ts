import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../models/product';
import {ProductsService} from '../../../../../services/crud/products.service';
import {CategoryService} from '../../../../../services/crud/category.service';
import {Category} from '../../../../../models/category';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProductComponent implements OnInit {

  private categories: Category[];

  private newProductForm = new FormGroup({
    productTitle: new FormControl(''),
    productCategory: new FormControl(''),
    productPrice: new FormControl(''),
    productQuantity: new FormControl(''),
    productDescription: new FormControl('')

  });

  constructor(private productsService: ProductsService, private modalService: NgbModal, private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(category => {
      this.categories = category.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Category;
      });
    });
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
    return false;
  }
}
