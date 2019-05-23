import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {UserSessionService} from '../../../services/user-session.service';
import {Cart} from '../../../models/products/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  private products: Product[];
  private cart: Cart;
  private userId: string;
  private prodId: any;

  constructor(private productsService: ProductsService,
              private session: UserSessionService) {
  }

  ngOnInit() {
    this.cart = new Cart();
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
    this.session.getUserDoc().subscribe(user => {
      this.userId = user.id;
      this.cart = Cart.clone(user.cart);
    });
  }

  consLog(productId, userId) {
    console.log(productId + " " + userId);

  }
  setProdId(productId) {
    this.prodId = productId;
  }
  getProdId() {
    return this.prodId;
  }
}
