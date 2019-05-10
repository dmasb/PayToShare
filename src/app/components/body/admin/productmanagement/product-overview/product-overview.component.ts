import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../../models/products/product';
import {ProductsService} from '../../../../../services/crud/products.service';
import {Tag} from '../../../../../models/products/tag';
import {Format} from '../../../../../models/products/format';
import {TagService} from '../../../../../services/product/tag.service';
import {FormatService} from '../../../../../services/product/format.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  page = 1;
  pageSize = 4;
  name: any;
  collectionSize: number;

  private products: Product[];
  private tags: Tag[];
  private formats: Format[];

  constructor(private productsService: ProductsService,
              private tagService: TagService,
              private formatService: FormatService) {
  }

  ngOnInit() {
    this.productsService.getProductsByTag([]).subscribe(products => this.products = products);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
  }

  sort() {
    const selectedOption = (document.getElementById('sortID') as HTMLSelectElement);

    switch (selectedOption.value) {
      case 'Price': {
        this.products.sort((a, b) => (a.price > b.price) ? -1 : 1);
        break;
      }
      case 'Title': {
        this.products.sort((a, b) => (a.title > b.title) ? -1 : 1);
        break;
      }
      case 'Quantity': {
        this.products.sort((a, b) => (a.quantity > b.quantity) ? -1 : 1);
        break;
      }
    }
  }

  onSubmit() {
    // pages
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
