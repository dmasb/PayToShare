import {Component, OnInit, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {License} from '../../../models/products/license';
import {Product} from '../../../models/products/product';
import {ProductsService} from '../../../services/crud/products.service';

@Component({
  selector: 'app-view-included-products',
  templateUrl: './view-included-products.component.html',
  styleUrls: ['./view-included-products.component.scss']
})
export class ViewIncludedProductsComponent implements OnInit {
  @Input() private license: License;
  private products: Product[];
  private img: any;

  constructor(private modalService: NgbModal,
              private productService: ProductsService) {
  }

  ngOnInit() {
  }

  isVideoFormat(product: Product) {
    if (product.format.name === 'MP4') {
      return true;
    }
  }

  openCenteredDialog(viewIncludedProducts) {
    this.productService.getProductsByTagAndFormat(this.license.tag.id, this.license.format.id).subscribe(products => this.products = products);
    this.modalService.open(viewIncludedProducts, {centered: true});
    return false;
  }
}
