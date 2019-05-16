import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/crud/products.service';
import {Product} from '../../../models/products/product';
import {Tag} from '../../../models/products/tag';
import {Format} from '../../../models/products/format';
import {UserSessionService} from '../../../services/user-session.service';
import {TagService} from '../../../services/product/tag.service';
import {FormatService} from '../../../services/product/format.service';
import {User} from '../../../models/user';
import {Cart} from '../../../models/products/cart';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  private tags: Tag[];
  private formats: Format[];

  constructor(private productsService: ProductsService,
              private session: UserSessionService,
              private tagService: TagService,
              private formatService: FormatService) {
  }

  ngOnInit() {
    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
  }
}
