import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {UserSessionService} from '../../../services/user-session.service';
import {Format} from '../../../models/products/format';
import {Tag} from '../../../models/products/tag';
import {TagService} from '../../../services/product/tag.service';
import {FormatService} from '../../../services/product/format.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Product[];
  private tags: Tag[];
  private formats: Format[];

  constructor(private productsService: ProductsService,
              private session: UserSessionService,
              private tagService: TagService,
              private formatService: FormatService) {
  }

  ngOnInit() {
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
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
