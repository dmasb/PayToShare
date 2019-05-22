import {Component, OnInit, Input} from '@angular/core';
import {ProductsService} from 'src/app/services/crud/products.service';
import {Router} from '@angular/router';
import {Product} from 'src/app/models/products/product';
import {ActivatedRoute} from '@angular/router';
import {activateRoutes} from '@angular/router/src/operators/activate_routes';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() searchText: string;

  private products: Product[];

  constructor(private router: Router,
              private ps: ProductsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.ps.getProductsByTag([]).subscribe(products => this.products = products);
  }


  getProducts(): Product[] {
    const keyword = this.route.snapshot.paramMap.get('searchWord');
    return this.products.filter(product => {
      return product.title.includes(keyword) ||
        product.tags.filter(tag => tag.name.includes(keyword)).length > 0;
    });
  }
}
