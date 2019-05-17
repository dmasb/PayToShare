import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {UserSessionService} from '../../../services/user-session.service';
import {Format} from '../../../models/products/format';
import {Tag} from '../../../models/products/tag';
import {TagService} from '../../../services/product/tag.service';
import {FormatService} from '../../../services/product/format.service';
import {Cart} from '../../../models/products/cart';
import {Observable} from "rxjs";
import {AngularFirestoreDocument} from "@angular/fire/firestore";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  private products: Product[];
  private cart: Cart;
  // user: Observable<any>;  STAR REVIEW

  constructor(private productsService: ProductsService,
              private session: UserSessionService) {
  }

  ngOnInit() {
    this.cart = new Cart();
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
    this.session.getUserDoc().subscribe(user => this.cart = Cart.clone(user.cart));

    // this.user = this.session.getUserDoc()   STAR-REVIEW
  }

  add(product: Product) {
    this.cart.add(product);
    this.session.updateCart(this.cart);
  }

  // get userId() {   STAR-REVIEW
  //   return this.user;
  // }

  // get productId() {   STAR-REVIEW
  //
  // }

}
