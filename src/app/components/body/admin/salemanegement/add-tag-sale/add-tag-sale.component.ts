import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../../../../models/products/tag';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {Product} from '../../../../../models/products/product';
import {ProductsService} from '../../../../../services/crud/products.service';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;


@Component({
  selector: 'app-add-tag-sale',
  templateUrl: './add-tag-sale.component.html',
  styleUrls: ['./add-tag-sale.component.scss']
})
export class AddTagSaleComponent implements OnInit {

  @Input() tags: Tag[];
  private products: Product[];
  private selectedTags: Tag[] = [];


  private newTagSale = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedTag: new FormControl('')
  });

  constructor(private salesService: SalesService,
              private productService: ProductsService) {
  }

  ngOnInit() {
  }


  pushPlan() {
    this.productService.getProducts().subscribe(products => this.products = products);
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

    // Filter out non-tagged products
    this.products = this.products.filter(product => {
      for (const tag of product.tags) {
        if (this.selectedTags.find(s => s.id === tag.id)) {
          return true;
        }
      }
    });

    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.PRODUCT;
    sale.begins = Timestamp.fromDate(new Date(sBegin));
    sale.ends = Timestamp.fromDate(new Date(sEnd));
    sale.discount = sDiscount;
    sale.saleObjects = this.products;

    this.salesService.addSale(sale);
    this.newTagSale.reset();
    this.selectedTags = [];
  }
}
