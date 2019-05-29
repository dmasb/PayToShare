import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../services/product/plan.service';
import {Plan} from '../../../models/products/plan';
import {SalesService} from '../../../services/product/sales.service';
import {Sale} from '../../../models/products/sale';
import {SaleType} from '../../../models/saleType';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  private productSale: Sale[];
  private planSale: Sale[];

  constructor(private planService: PlanService,
              private salesService: SalesService) {
  }

  ngOnInit() {
    this.salesService.getSaleOnType(SaleType.PRODUCT).subscribe(sales => this.productSale = sales);
    this.salesService.getSaleOnType(SaleType.PLAN).subscribe(sales => this.planSale = sales);
  }

  add(plan: Plan) {

  }

}
