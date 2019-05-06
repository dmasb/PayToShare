import {Component, OnInit} from '@angular/core';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';

@Component({
  selector: 'app-license-overview',
  templateUrl: './license-overview.component.html',
  styleUrls: ['./license-overview.component.scss']
})
export class LicenseOverviewComponent implements OnInit {

  licenses: License[];
  name: string;

  constructor(private licenseService: LicenseService) {
  }

  ngOnInit() {
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);

  }
}
