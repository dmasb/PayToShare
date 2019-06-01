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

  sortTile() {
    if (this.products[0].title < this.products[this.products.length - 1].title) {
      this.products.sort((a, b) => a.title < b.title ? 1 : -1);
    } else {
      this.products.sort((a, b) => a.title > b.title ? 1 : -1);
    }
  }

  sortTag() {
    if (this.products[0].tags.length < this.products[this.products.length - 1].tags.length) {
      this.products.sort((a, b) => a.tags.length < b.tags.length ? 1 : -1);
    } else {
      this.products.sort((a, b) => a.tags.length > b.tags.length ? 1 : -1);
    }
  }

  sortFormat() {
    if (this.products[0].format.name < this.products[this.products.length - 1].format.name) {
      this.products.sort((a, b) => a.format.name < b.format.name ? 1 : -1);
    } else {
      this.products.sort((a, b) => a.format.name > b.format.name ? 1 : -1);
    }
  }

  sortPrice() {
    if (this.products[0].price < this.products[this.products.length - 1].price) {
      this.products.sort((a, b) => a.price < b.price ? 1 : -1);
    } else {
      this.products.sort((a, b) => a.price > b.price ? 1 : -1);
    }
  }

  sortQuantity() {
    if (this.products[0].quantity < this.products[this.products.length - 1].quantity) {
      this.products.sort((a, b) => a.quantity < b.quantity ? 1 : -1);
    } else {
      this.products.sort((a, b) => a.quantity > b.quantity ? 1 : -1);
    }
  }
}
