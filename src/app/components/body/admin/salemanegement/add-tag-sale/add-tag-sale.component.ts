import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../../../../models/products/tag';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {firestore} from 'firebase/app';
import {License} from '../../../../../models/products/license';
import {LicenseService} from '../../../../../services/product/license.service';
import {MessageService} from '../../../../../services/message.service';
import {alerts} from '../../../../../models/alerts';
import Timestamp = firestore.Timestamp;


@Component({
  selector: 'app-add-tag-sale',
  templateUrl: './add-tag-sale.component.html',
  styleUrls: ['./add-tag-sale.component.scss']
})
export class AddTagSaleComponent implements OnInit {

  @Input() tags: Tag[];
  private licenses: License[];
  private selectedTags: Tag[] = [];
  private sales: Sale[];
  private newTagSale = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedTag: new FormControl('')
  });

  constructor(private salesService: SalesService,
              private licenseService: LicenseService,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }


  pushPlan() {
    this.licenseService.getLicenses().subscribe(licenses => this.licenses = licenses);
    if (this.newTagSale.controls.selectedTag.value) {
      const selected: Tag = JSON.parse(this.newTagSale.controls.selectedTag.value);
      if (this.selectedTags.findIndex(tag => tag.id === selected.id) === -1) {
        this.selectedTags.push(selected);
      }
    }
    this.salesService.getSales().subscribe(sales => this.sales = sales);
  }

  popPlan(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(each => each !== tag);
  }

  addTagSale() {
    const sName = this.newTagSale.controls.saleName.value;
    const sBegin = this.newTagSale.controls.saleBegin.value;
    const sEnd = this.newTagSale.controls.saleEnd.value;
    const sDiscount = this.newTagSale.controls.saleDiscount.value;

    // Filter out non-tagged licenses
    this.licenses = this.licenses.filter(license => {
      if (this.selectedTags.find(s => s.id === license.tag.id)) {
        return true;
      }
    });

    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.LICENSE;
    sale.begins = Timestamp.fromDate(new Date(sBegin));
    sale.ends = Timestamp.fromDate(new Date(sEnd));
    sale.discount = sDiscount;
    sale.saleObjects = this.licenses;


    const saleArray: Sale[] = [];
    const licenseArray: License[] = [];

    for (const license of this.licenses) {
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
      this.newTagSale.reset();
      this.selectedTags = [];
    } else {
      let str = '';
      let index = 0;
      while (index < saleArray.length) {
        str += licenseArray[index].tag.name + ' is already listed in ' + saleArray[index].name + ' in this period;';
        index++;
      }
      this.messageService.add(str, alerts.danger);
    }
  }
}
