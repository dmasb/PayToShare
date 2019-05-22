import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/crud/products.service';
import { Product } from 'src/app/models/products/product';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

@Input() searchText: string;

  private products: Product[];   
  
  constructor(private ps: ProductsService) { }

  getProducts(): Product[] {
    return this.products.filter(product => {
      return product.title.includes(this.searchText) ||
        product.tags.filter(tag => tag.name.includes(this.searchText));
    });
  }

  ngOnInit() {
    this.ps.getProductsByTag([]).subscribe(products => this.products = products);
  }

}
