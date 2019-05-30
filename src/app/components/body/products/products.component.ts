import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {UserSessionService} from '../../../services/user-session.service';
import {Cart} from '../../../models/products/cart';
import {StarService} from '../../../services/product/star.service';
import {Rating} from '../../../models/rating';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  private products: Product[];
  private cart: Cart;
  private userId: string;
  private ratings: Rating[];
  private selectedProduct: Product = null;

  constructor(private productsService: ProductsService,
              private session: UserSessionService,
              private starService: StarService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.cart = new Cart();
    this.starService.getRatings().subscribe(ratings => this.ratings = ratings);
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
    this.session.getUserDoc().subscribe(user => {
      this.userId = user.id;
      this.cart = Cart.clone(user.cart);
    });
  }

  isVideoFormat(product: Product){
    if (product.format.name === 'MP4') return true;
  }

  openModal(product: Product, modal){
    this.modalService.open(modal)
    this.selectedProduct = product;
  }
}
