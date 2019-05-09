import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../../../../models/products/tag';
import {SalesService} from '../../../../../services/product/sales.service';
import {firestore} from 'firebase/app';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-add-tag-sale',
  templateUrl: './add-tag-sale.component.html',
  styleUrls: ['./add-tag-sale.component.scss']
})
export class AddTagSaleComponent implements OnInit {

  @Input() tags: Tag[];
  private selectedTags: Tag[] = [];


  private newTagSale = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedTag: new FormControl('')
  });

  constructor(private salesService: SalesService) {
  }

  ngOnInit() {
  }


  pushPlan() {
    if (this.newTagSale.controls.selectedTag.value) {
      const selected: Tag = JSON.parse(this.newTagSale.controls.selectedTag.value);
      if (this.selectedTags.findIndex(plan => plan.id === selected.id) === -1) {
        this.selectedTags.push(selected);
      }
    }
  }

  popPlan(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(each => each !== tag);
  }

  addTagSale() {
    const sName = this.newTagSale.controls.saleName.value;
    const sBegin = this.newTagSale.controls.saleBegin.value;
    const sEnd = this.newTagSale.controls.saleEnd.value;
    const sDiscount = this.newTagSale.controls.saleDiscount.value;

    const tagsToSale: string[] = [];
    this.selectedTags.forEach(tag => tagsToSale.push(tag.id));

    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.PLAN;
    sale.begins = sBegin;
    sale.ends = sEnd;
    sale.discount = sDiscount;
    sale.salesObjectsIDs = tagsToSale;
    sale.created = Timestamp.now();


    this.salesService.addSale(sale);
    this.newTagSale.reset();
    this.selectedTags = [];
  }
}
