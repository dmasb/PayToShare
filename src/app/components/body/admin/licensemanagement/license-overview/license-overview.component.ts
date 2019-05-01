import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-license-overview',
  templateUrl: './license-overview.component.html',
  styleUrls: ['./license-overview.component.scss']
})
export class LicenseOverviewComponent implements OnInit {

  licenses: Observable<License[]>;
  name: string;

  constructor(pipe: DecimalPipe,
              private licenseService: LicenseService) {
  }

  ngOnInit() {
    this.licenses = this.licenseService.getLicenses();

  }
}
