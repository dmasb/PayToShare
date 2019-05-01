import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from '../../../../../services/crud/products.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() description: string;

  constructor(private productsService: ProductsService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteModal) {
    this.modalService.open(confirmDeleteModal, {centered: true});
  }

  requestProductDelete() {
    this.productsService.available(this.id);
  }

  confirmDelete() {
    this.productsService.remove();
  }

  cancelDelete() {
    this.productsService.cancel();
  }
}
