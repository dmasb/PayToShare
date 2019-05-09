import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../models/products/product';
import {ProductsService} from '../../../services/crud/products.service';
import { UserSessionService } from 'src/app/services/user-session.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  private salesProducts: Observable<Product[]>;

  constructor(private productsService: ProductsService,private session: UserSessionService) {


  }

  ngOnInit() {
    this.salesProducts = this.productsService.getProductsByTag(['Deal of the Day']);
  }
  add(product: Product){
    this.session.addToCart(product);
  }

}
