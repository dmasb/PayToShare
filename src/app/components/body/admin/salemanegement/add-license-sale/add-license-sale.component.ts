import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {License} from '../../../../../models/products/license';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;


@Component({
  selector: 'app-add-license-sale',
  templateUrl: './add-license-sale.component.html',
  styleUrls: ['./add-license-sale.component.scss']
})
export class AddLicenseSaleComponent implements OnInit {

  @Input() private licenses: License[];
  private selectedLicenses: License[] = [];
  private newLicenseForm = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedLicense: new FormControl('')
  });

  constructor(private salesService: SalesService) {
  }

  ngOnInit() {
  }


  pushProduct() {
    if (this.newLicenseForm.controls.selectedLicense.value) {
      const selected: License = JSON.parse(this.newLicenseForm.controls.selectedLicense.value);
      if (this.selectedLicenses.findIndex(plan => plan.id === selected.id) === -1) {
        this.selectedLicenses.push(selected);
      }
    }
  }

  popProduct(license: License) {
    this.selectedLicenses = this.selectedLicenses.filter(each => each !== license);
  }

  addProductSale() {
    const sName = this.newLicenseForm.controls.saleName.value;
    const sBegin = this.newLicenseForm.controls.saleBegin.value;
    const sEnd = this.newLicenseForm.controls.saleEnd.value;
    const sDiscount = this.newLicenseForm.controls.saleDiscount.value;

    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.LICENSE;
    sale.begins = Timestamp.fromDate(new Date(sBegin));
    sale.ends = Timestamp.fromDate(new Date(sEnd));
    sale.discount = sDiscount;
    sale.saleObjects = this.selectedLicenses;
    console.log(sale);

    this.salesService.addSale(sale);
    this.newLicenseForm.reset();
    this.selectedLicenses = [];
  }
}
