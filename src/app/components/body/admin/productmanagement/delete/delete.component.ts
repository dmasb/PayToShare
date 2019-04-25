import {Component, OnInit, Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductsService} from '../../../../../services/crud/products.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
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
