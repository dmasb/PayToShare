import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../../models/products/product';
import {ProductsService} from 'src/app/services/crud/products.service';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  products: Product[];
    private searchTerm: string;

  constructor(private router: Router, private ps: ProductsService) {
  }

  ngOnInit() {

  }

  listSearch() {
    this.router.navigate([`/search/${this.searchTerm}`]);
  }
}
