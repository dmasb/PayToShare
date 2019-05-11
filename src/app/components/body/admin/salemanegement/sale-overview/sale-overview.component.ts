import {Component, OnInit} from '@angular/core';
import {Plan} from '../../../../../models/products/plan';
import {PlanService} from '../../../../../services/product/plan.service';
import {TagService} from '../../../../../services/product/tag.service';
import {Tag} from '../../../../../models/products/tag';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {MessageService} from '../../../../../services/message.service';
import {Product} from '../../../../../models/products/product';
import {ProductsService} from '../../../../../services/crud/products.service';

@Component({
  selector: 'app-sale-overview',
  templateUrl: './sale-overview.component.html',
  styleUrls: ['./sale-overview.component.scss']
})
export class SaleOverviewComponent implements OnInit {

  private products: Product[];
  private sales: Sale[];
  private plans: Plan[];
  private tags: Tag[];

  constructor(private planService: PlanService,
              private tagService: TagService,
              private salesService: SalesService,
              private messageService: MessageService,
              private productService: ProductsService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
    this.salesService.getSales().subscribe(sales => this.sales = sales);
    this.planService.getPlans().subscribe(plans => this.plans = plans);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  getItemNames(salesObjects: any[], type: SaleType): string[] {
    const names: string[] = [];
    if (this.tags && this.plans) {
      if (type === SaleType.PRODUCT) {
        const products: Product[] = salesObjects;
        if (products) {
          products.forEach(product => {
            names.push(product.title);
          });
          return names;
        }
      } else if (type === SaleType.PLAN) {
        const plans: Plan[] = salesObjects;
        if (plans) {
          plans.forEach(plan => {
            names.push(plan.title);
          });
          return names;
        }
      }
    }
  }
}
