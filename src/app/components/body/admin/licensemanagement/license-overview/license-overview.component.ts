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
}
