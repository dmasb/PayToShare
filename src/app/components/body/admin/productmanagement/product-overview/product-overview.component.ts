import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../../models/products/product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductsService} from '../../../../../services/crud/products.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  page = 1;
  pageSize = 4;
  name: any;
  products: Product[];
  collectionSize: number;

  constructor(private modalService: NgbModal, private productsService: ProductsService) {
    this.productsService.getProducts().subscribe(products => {
      this.products = products.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Product;
      });
    });
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Product;
      });
    });

    // TODO: Fix: This produces undefined in console.
    console.log(this.products);
  }

  onSubmit() {
    // pages
  }
}
