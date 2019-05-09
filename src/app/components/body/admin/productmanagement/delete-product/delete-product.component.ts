import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../../../../services/crud/products.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../../models/products/product';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  @Input() private product: Product;

  constructor(private productsService: ProductsService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteModal) {
    this.modalService.open(confirmDeleteModal, {centered: true});
  }

  confirmDelete() {
    this.productsService.confirmDelete(this.product);
  }
}
