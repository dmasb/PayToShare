import { Component, OnInit, Input } from '@angular/core';
import { SearchbarComponent } from '../../navbar/searchbar/searchbar.component';
import { ProductsService } from 'src/app/services/crud/products.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products/product';
import { Tag } from 'src/app/models/products/tag';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

@Input() searchText: string;

  private products: Product[];   
  
  
 /*  filteredProducts: Product[];
  private _searchTerm: string; */

/*   get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string){
    this._searchTerm = value;
    this.filteredProducts = this.filterProducts(value);    
  }

  filterProducts(searchString: Tag["name"]){
    return this.products.filter( product => product.tags.indexOf(searchString.toLowerCase) !== -1 );
  } */


  constructor(private router: Router, private ps: ProductsService) { }

  getProducts(): Product[] {

    this.products.filter(this.searchText);

  }

  ngOnInit() {
    this.ps.getProductsByTag([]).subscribe(products => this.products = products);
  }

}
