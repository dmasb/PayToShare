import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {License} from '../../../../../models/products/license';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {alerts} from '../../../../../models/alerts';
import {MessageService} from '../../../../../services/message.service';


@Component({
  selector: 'app-add-license-sale',
  templateUrl: './add-license-sale.component.html',
  styleUrls: ['./add-license-sale.component.scss']
})
export class AddLicenseSaleComponent implements OnInit {

  @Input() private licenses: License[];
  private selectedLicenses: License[] = [];
  private sales: Sale[];
  private newLicenseSale = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedLicense: new FormControl('')
  });

  constructor(private salesService: SalesService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.salesService.getAllSales().subscribe(sales => this.sales = sales);
  }


  pushProduct() {
    if (this.newLicenseSale.controls.selectedLicense.value) {
      const selected: License = JSON.parse(this.newLicenseSale.controls.selectedLicense.value);
      if (this.selectedLicenses.findIndex(license => license.id === selected.id) === -1) {
        this.selectedLicenses.push(selected);
      }
    }
  }

  popProduct(license: License) {
    this.selectedLicenses = this.selectedLicenses.filter(each => each !== license);
  }

  addLicenseSale() {
    const sName = this.newLicenseSale.controls.saleName.value;
    const sBegin = this.newLicenseSale.controls.saleBegin.value;
    const sEnd = this.newLicenseSale.controls.saleEnd.value;
    const sDiscount = this.newLicenseSale.controls.saleDiscount.value;

    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.LICENSE;
    sale.begins = Timestamp.fromDate(new Date(sBegin));
    sale.ends = Timestamp.fromDate(new Date(sEnd));
    sale.discount = sDiscount;
    sale.saleObjects = this.selectedLicenses;

    const saleArray: Sale[] = [];
    const licenseArray: License[] = [];

    for (const license of this.selectedLicenses) {
      for (const o of this.sales) {
        if (o.type === SaleType.LICENSE) {
          const tempLicenses = o.saleObjects as License[];
          const isListed = tempLicenses.filter(l => l.id === license.id).length > 0;
          if (isListed && sale.begins >= o.begins && sale.begins <= o.ends) {
            saleArray.push(o);
            licenseArray.push(license);
          }
        }
      }
    }

    if (saleArray.length === 0 && licenseArray.length === 0) {

      this.salesService.addSale(sale);
      this.newLicenseSale.reset();
      this.selectedLicenses = [];
    } else {
      let str = '';
      let index = 0;
      while (index < saleArray.length) {
        str += licenseArray[index].title + ' is already listed in ' + saleArray[index].name + ' in this period;';
        index++;
      }
      this.messageService.add(str, alerts.danger);
    }
  }
}
