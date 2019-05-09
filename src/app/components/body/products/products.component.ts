import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Product[];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
  }
}
