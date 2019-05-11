import {Component, OnInit, Input} from '@angular/core';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {Product} from '../../../../../models/products/product';
import {FormControl, FormGroup} from '@angular/forms';
import {SalesService} from '../../../../../services/product/sales.service';

@Component({
  selector: 'app-add-product-sale',
  templateUrl: './add-product-sale.component.html',
  styleUrls: ['./add-product-sale.component.scss']
})
export class AddProductSaleComponent implements OnInit {

  @Input() private products: Product[];
  private selectedProducts: Product[] = [];
  private newProductSale = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedProduct: new FormControl('')
  });

  constructor(private salesService: SalesService) {
  }

  ngOnInit() {
  }


  pushProduct() {
    if (this.newProductSale.controls.selectedProduct.value) {
      const selected: Product = JSON.parse(this.newProductSale.controls.selectedProduct.value);
      if (this.selectedProducts.findIndex(plan => plan.id === selected.id) === -1) {
        this.selectedProducts.push(selected);
      }
    }
  }

  popProduct(product: Product) {
    this.selectedProducts = this.selectedProducts.filter(each => each !== product);
  }

  addProductSale() {
    const sName = this.newProductSale.controls.saleName.value;
    const sBegin = this.newProductSale.controls.saleBegin.value;
    const sEnd = this.newProductSale.controls.saleEnd.value;
    const sDiscount = this.newProductSale.controls.saleDiscount.value;

    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.PRODUCT;
    sale.begins = sBegin;
    sale.ends = sEnd;
    sale.discount = sDiscount;
    sale.saleObjects = this.selectedProducts;
    console.log(sale);

    this.salesService.addSale(sale);
    this.newProductSale.reset();
    this.selectedProducts = [];
  }
}
