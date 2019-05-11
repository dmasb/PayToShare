import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Plan} from '../../../models/products/plan';
import {Product} from '../../../models/products/product';
import {Tag} from '../../../models/products/tag';
import {Format} from '../../../models/products/format';
import {UserSessionService} from '../../../services/user-session.service';
import {TagService} from '../../../services/product/tag.service';
import {FormatService} from '../../../services/product/format.service';
import {PlanService} from '../../../services/product/plan.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  private products: Product[];
  private tags: Tag[];
  private formats: Format[];
  private plans: Plan[];

  constructor(private productsService: ProductsService,
              private session: UserSessionService,
              private tagService: TagService,
              private formatService: FormatService,
              private planService: PlanService) {
  }

  ngOnInit() {
    console.log(this.productsService.getProducts());

    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
    this.planService.getSalePlans().subscribe(plans => this.plans = plans);
  }

  add(product: Product) {
    this.session.addToCart(product);
  }

  getFormatName(formatID: string): string {
    if (this.formats) {
      return this.formats.find(format => format.id === formatID).name;
    }
  }

  getTagName(tagID: string): string {
    if (this.tags) {
      return this.tags.find(tag => tag.id === tagID).name;
    }
  }
}
