import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';
import {FormatService} from '../../../../../services/product/format.service';
import {TagService} from '../../../../../services/product/tag.service';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-license-overview',
  templateUrl: './license-overview.component.html',
  styleUrls: ['./license-overview.component.scss']
})
export class LicenseOverviewComponent implements OnInit {

  licenses: Observable<License[]>;
  name: string;

  constructor(pipe: DecimalPipe,
              private licenseService: LicenseService,
              private formatService: FormatService,
              private tagService: TagService,
              private afs: AngularFirestore) {
  }

  async ngOnInit() {
    this.licenses = this.licenseService.getLicenses();

  }

  getFormatName(formatID: string) {
  }
}
