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
    this.salesService.getAllSales().subscribe(sales => {
      if (sales) {
        this.sales = sales;
      }
    });
    this.tagService.getTags().subscribe(tags => this.tags = tags);
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

  sortTitle() {
    if (this.sales[0].name > this.sales[this.sales.length - 1].name) {
      this.sales.sort((a, b) => a.name > b.name ? 1 : -1);
    } else {
      this.sales.sort((a, b) => a.name < b.name ? 1 : -1);
    }
  }

  sortType() {
    if (this.sales[0].type > this.sales[this.sales.length - 1].type) {
      this.sales.sort((a, b) => a.type > b.type ? 1 : -1);
    } else {
      this.sales.sort((a, b) => a.type < b.type ? 1 : -1);
    }
  }

  sortIncludes() {
    if (this.sales[0].saleObjects.length > this.sales[this.sales.length - 1].saleObjects.length) {
      this.sales.sort((a, b) => a.saleObjects.length > b.saleObjects.length ? 1 : -1);
    } else {
      this.sales.sort((a, b) => a.saleObjects.length < b.saleObjects.length ? 1 : -1);
    }
  }

  sortDiscount() {
    if (this.sales[0].discount > this.sales[this.sales.length - 1].discount) {
      this.sales.sort((a, b) => a.discount > b.discount ? 1 : -1);
    } else {
      this.sales.sort((a, b) => a.discount < b.discount ? 1 : -1);
    }
  }

  sortBeings() {
    if (this.sales[0].begins > this.sales[this.sales.length - 1].begins) {
      this.sales.sort((a, b) => a.begins > b.begins ? 1 : -1);
    } else {
      this.sales.sort((a, b) => a.begins < b.begins ? 1 : -1);
    }
  }

  sortEnds() {
    if (this.sales[0].ends > this.sales[this.sales.length - 1].ends) {
      this.sales.sort((a, b) => a.ends > b.ends ? 1 : -1);
    } else {
      this.sales.sort((a, b) => a.ends < b.ends ? 1 : -1);
    }
  }
}
