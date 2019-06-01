import {Component, OnInit} from '@angular/core';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';
import {Tag} from '../../../../../models/products/tag';
import {Format} from '../../../../../models/products/format';
import {TagService} from '../../../../../services/product/tag.service';
import {FormatService} from '../../../../../services/product/format.service';

@Component({
  selector: 'app-license-overview',
  templateUrl: './license-overview.component.html',
  styleUrls: ['./license-overview.component.scss']
})
export class LicenseOverviewComponent implements OnInit {

  licenses: License[];
  private tags: Tag[];
  private formats: Format[];

  constructor(private licenseService: LicenseService,
              private tagService: TagService,
              private formatService: FormatService) {
  }

  ngOnInit() {
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
  }

  sortName() {
    if (this.licenses[0].title < this.licenses[this.licenses.length - 1].title) {
      this.licenses.sort((a, b) => (a.title > b.title ? -1 : 1));
    } else {
      this.licenses.sort((a, b) => (a.title < b.title ? -1 : 1));
    }
  }

  sortPrice() {
    if (this.licenses[0].price < this.licenses[this.licenses.length - 1].price) {
      this.licenses.sort((a, b) => (a.price > b.price ? -1 : 1));
    } else {
      this.licenses.sort((a, b) => (a.price < b.price ? -1 : 1));
    }
  }

  sortQuantity() {
    if (this.licenses[0].quantity < this.licenses[this.licenses.length - 1].quantity) {
      this.licenses.sort((a, b) => (a.quantity > b.quantity ? -1 : 1));
    } else {
      this.licenses.sort((a, b) => (a.quantity < b.quantity ? -1 : 1));
    }
  }

  sortFormat() {
    if (this.licenses[0].format.name < this.licenses[this.licenses.length - 1].format.name) {
      this.licenses.sort((a, b) => (a.format.name > b.format.name ? -1 : 1));
    } else {
      this.licenses.sort((a, b) => (a.format.name < b.format.name ? -1 : 1));
    }
  }

  sortTag() {
    if (this.licenses[0].tag.name < this.licenses[this.licenses.length - 1].tag.name) {
      this.licenses.sort((a, b) => (a.tag.name > b.tag.name ? -1 : 1));
    } else {
      this.licenses.sort((a, b) => (a.tag.name < b.tag.name ? -1 : 1));
    }
  }
}
