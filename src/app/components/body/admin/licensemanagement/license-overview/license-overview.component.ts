import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';
import {FormatService} from '../../../../../services/product/format.service';
import {TagService} from '../../../../../services/product/tag.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-license-overview',
  templateUrl: './license-overview.component.html',
  styleUrls: ['./license-overview.component.scss']
})
export class LicenseOverviewComponent implements OnInit {

  licenses: License[];
  constructor(pipe: DecimalPipe,
              private licenseService: LicenseService,
              private formatService: FormatService,
              private tagService: TagService,
              private afs: AngularFirestore) {
  }

  async ngOnInit() {
    await this.licenseService.getLicenses().subscribe(tag => {
      this.licenses = tag.map(obj => {
        console.log('hereeeeeeeeE?');
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as License;
      });
    });

  }

  getFormatName(id: string) {

  }


}
