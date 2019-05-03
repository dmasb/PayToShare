import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {Observable} from 'rxjs';
import {Plan} from '../../../models/products/plan';
import {PlanService} from '../../../services/product/plan.service';
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
    this.regularProducts = this.productsService.getRegularItems();
    this.salesProducts = this.productsService.getSalesItems();
  }
}
