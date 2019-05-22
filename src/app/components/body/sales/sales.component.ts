import {Component, OnInit} from '@angular/core';
import {Sale} from '../../../models/products/sale';
import {PlanService} from '../../../services/product/plan.service';
import {SalesService} from '../../../services/product/sales.service';
import {SaleType} from '../../../models/saleType';
import {Plan} from '../../../models/products/plan';
import {License} from '../../../models/products/license';
import {Cart} from '../../../models/products/cart';
import {UserSessionService} from '../../../services/user-session.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  private licenseSale: Sale[];
  private planSale: Sale[];
  private cart: Cart;

  constructor(private planService: PlanService,
              private salesService: SalesService,
              private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    this.cart = new Cart();
    this.salesService.getSaleOnType(SaleType.LICENSE).subscribe(sales => this.licenseSale = sales);
    this.salesService.getSaleOnType(SaleType.PLAN).subscribe(sales => this.planSale = sales);
    this.userSessionService.getUserDoc().subscribe(user => {
      this.cart = Cart.clone(user.cart);
    });
  }

  unpackLicenses(licenses: any[]): License[] {
    return licenses as License[];
  }

  unpackPlans(plans: any[]): Plan[] {
    return plans as Plan[];
  }

  addLicense(license: License) {
    this.cart.add(license);
    this.userSessionService.updateCart(this.cart);
  }

  addPlan(plan: Plan) {
    this.cart.plan = plan;
    this.userSessionService.updateCart(this.cart);
  }
}
