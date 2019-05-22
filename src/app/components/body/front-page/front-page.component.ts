import { Component, OnInit } from '@angular/core';
import {Tag} from '../../../models/products/tag';
import {Format} from '../../../models/products/format';
import {ProductsService} from '../../../services/crud/products.service';
import {UserSessionService} from '../../../services/user-session.service';
import {TagService} from '../../../services/product/tag.service';
import {FormatService} from '../../../services/product/format.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

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
