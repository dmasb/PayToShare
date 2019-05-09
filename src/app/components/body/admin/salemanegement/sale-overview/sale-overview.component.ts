import {Component, OnInit} from '@angular/core';
import {Plan} from '../../../../../models/products/plan';
import {PlanService} from '../../../../../services/product/plan.service';
import {TagService} from '../../../../../services/product/tag.service';
import {Tag} from '../../../../../models/products/tag';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';

@Component({
  selector: 'app-sale-overview',
  templateUrl: './sale-overview.component.html',
  styleUrls: ['./sale-overview.component.scss']
})
export class SaleOverviewComponent implements OnInit {

  private sales: Sale[];
  private plans: Plan[];
  private tags: Tag[];

  constructor(private planService: PlanService,
              private tagService: TagService,
              private salesService: SalesService) {
  }

  ngOnInit() {
    this.salesService.getSales().subscribe(sales => this.sales = sales);
    this.planService.getPlans().subscribe(plans => this.plans = plans);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  getName(objID: string, type: SaleType): string {
    if (this.tags && this.plans) {
      if (type === SaleType.TAG) {
        return this.tags.find(tag => tag.id === objID).name;
      } else if (type === SaleType.PLAN) {
        return this.plans.find(plan => plan.id === objID).title;
      }
    }
  }
}
