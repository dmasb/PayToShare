import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../services/product/plan.service';
import {Plan} from '../../../models/products/plan';
import {SalesService} from '../../../services/product/sales.service';
import {Sale} from '../../../models/products/sale';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  private plans: Plan[];
  private sales: Sale[];
  private salePlans: Plan[];


  constructor(private planService: PlanService,
              private salesService: SalesService) {
  }

  async ngOnInit() {
    await this.planService.getPlans().subscribe(plans => this.plans = plans);
    await this.salesService.getSales().subscribe(sales => this.sales = sales);
    if (this.plans && this.sales) {
      this.salePlans = await this.getSalesPlans(this.plans, this.sales);
    }
  }

  add(plan: Plan) {

  }

  getSalesPlans(plans: Plan[], sales: Sale[]): Plan[] {
    if (plans && sales) {

    }
    return this.salePlans = plans.map(plan => {
      plan.title = 'xD';
      return plan;
    });
    /*if (plan.salesID !== 'none') {
      const discount = sales.find(sale => sale.salesObjectsID === plan.id).discount;
      plan.price *= (discount / 100);
      return plan;
    }*/
  }
}
