import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {Observable} from 'rxjs';
import {UserSessionService} from "../../../services/user-session.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private salesProducts: Observable<Product[]>;
  private regularProducts: Observable<Product[]>;

  constructor(private productsService: ProductsService, private session: UserSessionService) {
  }

  ngOnInit() {

    this.salesProducts = this.productsService.getProductsByTag(['Deal of the Day']);

    this.regularProducts = this.productsService.getProductsByTag([]);
  }

  add(product: Product){
    this.session.addToCart(product);
  }


}
