import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../../models/products/product';
import {Tag} from '../../../models/products/tag';
import {ProductsService} from 'src/app/services/crud/products.service';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  private searchTerm: string;

  /*get searchTerm(): string {
    return this.searchTerm;
  }

  set searchTerm(value: string) {
    this.searchTerm = value;
    this.filteredProducts = this.filterProducts(value);
  }*/

  filterProducts(searchString: Tag['name']) {
    return this.products.filter(product => product.tags.indexOf(searchString.toLowerCase) !== -1);
  }

  constructor(private router: Router, private ps: ProductsService) {
  }

  ngOnInit() {

  }

  listSearch() {

    this.router.navigate([`/search/${this.searchTerm}`]);
  }
}
