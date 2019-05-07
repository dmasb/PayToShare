import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {Observable} from 'rxjs';
import {Plan} from '../../../models/products/plan';
import {PlanService} from '../../../services/product/plan.service';
import {map} from 'rxjs/operators';
import {Tag} from '../../../models/products/tag';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private plans: Observable<Plan[]>;
  private salesProducts: Observable<Product[]>;
  private regularProducts: Observable<Product[]>;

  constructor(private productsService: ProductsService,
              private planService: PlanService) {
  }

  ngOnInit() {
    this.plans = this.planService.getPlans();
    this.salesProducts = this.sales();
    this.regularProducts = this.regular();
  }

  regular(): Observable<Product[]> {
    return this.productsService.getProducts().pipe(
      map(s => s.filter(r => r.tags.every(o => o.name !== 'Deal of the Day'))));
  }

  sales(): Observable<Product[]> {
    return this.productsService.getProducts().pipe(
      map(s => s.filter(r => r.tags.every(o => o.name === 'Deal of the Day'))));
  }
}
