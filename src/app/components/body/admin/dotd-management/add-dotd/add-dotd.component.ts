import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {Format} from '../../../../../models/products/format';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';
import {FormatService} from '../../../../../services/product/format.service';
import {LicenseService} from '../../../../../services/product/license.service';
import {FormControl, FormGroup} from '@angular/forms';
import {License} from '../../../../../models/products/license';
import {SalesService} from 'src/app/services/product/sales.service';

@Component({
  selector: 'app-add-dotd',
  templateUrl: './add-dotd.component.html',
  styleUrls: ['./add-dotd.component.scss']
})
export class AddDotdComponent implements OnInit {

  private tags: Tag[];
  private formats: Format[];
  private licenses: License[];

  newSalesForm = new FormGroup({
    salesName: new FormControl(''),
    licenseID: new FormControl(''),
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
    this.tagService.getTags().subscribe(tags => this.tags = tags);
    this.formatService.getFormats().subscribe(formats => this.formats = formats);
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
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
