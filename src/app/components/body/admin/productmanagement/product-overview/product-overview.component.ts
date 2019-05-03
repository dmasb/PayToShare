import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../../models/products/product';
import {ProductsService} from '../../../../../services/crud/products.service';
import {Observable} from 'rxjs';
import {Tag} from '../../../../../models/products/tag';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  page = 1;
  pageSize = 4;
  name: any;
  private products: Observable<Product[]>;
  collectionSize: number;

  private selectedProducts: string[] = [];


  constructor(private productsService: ProductsService) {

  }

  ngOnInit() {
    this.products = this.productsService.getProductsDashboard(0);
  }

  sort() {
    const value = (document.getElementById('sortID') as HTMLSelectElement);
    this.products = this.productsService.getProductsDashboard(value.selectedIndex);
  }

  checkProduct(productID: string) {

    if (this.selectedProducts.findIndex(id => id === productID) === -1 && productID) {
      this.selectedProducts.push(productID);
    } else {
      this.selectedProducts = this.selectedProducts.filter(id => id !== productID);
    }
    console.log('###############################################');
    this.selectedProducts.forEach(s => console.log(s));
    console.log('###############################################');
  }


  onSubmit() {
    // pages
  }

  markAsDeals() {
    this.productsService.markAsDeals(this.selectedProducts);
  }
}
