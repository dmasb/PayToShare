import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../../models/products/product';
import {ProductsService} from '../../../../../services/crud/products.service';
import {Observable} from 'rxjs';

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

  constructor(private productsService: ProductsService) {

  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  onSubmit() {
    // pages
  }
}
