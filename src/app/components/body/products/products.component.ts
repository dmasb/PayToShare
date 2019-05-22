import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {UserSessionService} from '../../../services/user-session.service';
import {Cart} from '../../../models/products/cart';
import {Observable} from 'rxjs';
import {License} from '../../../models/products/license';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  private products: Product[];
  private cart: Cart;
  private userId: string;

  user: Observable<any>;
  product: Observable<any>;

  // user: Observable<any>;  STAR REVIEW

  constructor(private productsService: ProductsService,
              private session: UserSessionService,
              // private afs: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.cart = new Cart();
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
    this.session.getUserDoc().subscribe(user => {
      this.userId = user.id;
      this.cart = Cart.clone(user.cart);
    });

    // this.userDoc = this.afs.doc(DO SHIT HERE!)
    // this.user = this.session.getUserDoc()   STAR-REVIEW
  }

  add(license: License) {
    this.cart.add(license);
    this.session.updateCart(this.cart);
  }

  // get userId() {   STAR-REVIEW
  //   return this.user;
  // }

  // get productId() {   STAR-REVIEW
  //
  // }

}
