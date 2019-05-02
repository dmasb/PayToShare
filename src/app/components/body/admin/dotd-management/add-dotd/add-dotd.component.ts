import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {Format} from '../../../../../models/products/format';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';
import {FormatService} from '../../../../../services/product/format.service';
import {LicenseService} from '../../../../../services/product/license.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {License} from '../../../../../models/products/license';
import { SalesService } from 'src/app/services/product/sales.service';

@Component({
  selector: 'app-add-dotd',
  templateUrl: './add-dotd.component.html',
  styleUrls: ['./add-dotd.component.scss']
})
export class AddDotdComponent implements OnInit {

  private tags: Observable<Tag[]>;
  private formats: Observable<Format[]>;
  private licenses: Observable<License[]>;

  newSalesForm = new FormGroup({
    salesName: new FormControl(''),
    licensID: new FormControl(''),
    formatID: new FormControl(''),
    tagID: new FormControl('')
  });

  constructor(private licenseService: LicenseService,
    private modalService: NgbModal,
    private tagService: TagService,
    private formatService: FormatService,
    private saleService: SalesService) {
}

  ngOnInit() {
    this.tags = this.tagService.getTags();
    this.formats = this.formatService.getFormats();
    this.licenses = this.licenseService.getLicenses();
  }

  addSale() {
    this.saleService.addSale(
      this.newSalesForm.controls.salesName.value,
      this.newSalesForm.controls.licenseID.value,
      this.newSalesForm.controls.formatID.value,
      this.newSalesForm.controls.tagID.value
    );
    this.modalService.dismissAll();
  }

  openCenteredDialog(addSaleModal) {
    this.modalService.open(addSaleModal, {centered: true});
    return false;
  }
}
