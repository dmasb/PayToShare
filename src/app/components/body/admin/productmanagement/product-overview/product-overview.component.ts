import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../../models/products/product';
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
  collectionSize: number;

  private products: Product[];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
  }

  sort() {
    const selectedOption = (document.getElementById('sortID') as HTMLSelectElement);
    console.log(selectedOption);
    switch (selectedOption.value) {
      case 'Price': {
        this.products.sort((a, b) => (a.price > b.price) ? -1 : 1);
        break;
      }
      case 'Title': {
        this.products.sort((a, b) => (a.title > b.title) ? -1 : 1);
        break;
      }
      case 'Quantity': {
        this.products.sort((a, b) => (a.quantity > b.quantity) ? -1 : 1);
        break;
      }
    }
  }

  onSubmit() {
    // pages
  }
}
