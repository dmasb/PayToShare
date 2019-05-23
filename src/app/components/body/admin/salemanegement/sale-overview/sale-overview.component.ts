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
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';

@Component({
  selector: 'app-sale-overview',
  templateUrl: './sale-overview.component.html',
  styleUrls: ['./sale-overview.component.scss']
})
export class SaleOverviewComponent implements OnInit {

  private plans: Plan[];
  private licenses: License[];
  private products: Product[];
  private sales: Sale[];
  private tags: Tag[];

  constructor(private planService: PlanService,
              private licenseService: LicenseService,
              private tagService: TagService,
              private salesService: SalesService,
              private messageService: MessageService,
              private productService: ProductsService) {
  }

  ngOnInit() {
    this.planService.getPlans().subscribe(plans => this.plans = plans);
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    this.productService.getProducts().subscribe(products => this.products = products);
    this.salesService.getAllSales().subscribe(sales => this.sales = sales);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  sort() {
    const selectedOption = (document.getElementById('sortSales') as HTMLSelectElement);

    switch (selectedOption.value) {
      case 'Discount': {
        this.sales.sort((a, b) => (a.discount > b.discount) ? -1 : 1);
        break;
      }
      case 'Title': {
        this.sales.sort((a, b) => (a.name < b.name) ? -1 : 1);
        break;
      }
      case 'Period': {
        this.sales.sort((a, b) => (a.begins < b.begins) ? -1 : 1);
        break;
      }
    }
  }

  getItemNames(salesObjects: any[], type: SaleType): string[] {
    const names: string[] = [];
    if (this.tags && this.plans) {
      if (type === SaleType.PLAN) {
        const plans: Plan[] = salesObjects;
        if (plans) {
          plans.forEach(plan => {
            names.push(plan.title);
          });
          return names;
        }
      } else if (type === SaleType.LICENSE) {
        const licenses: License[] = salesObjects;
        if (licenses) {
          licenses.forEach(product => {
            names.push(product.title);
          });
          return names;
        }
      }
    }
  }
}
