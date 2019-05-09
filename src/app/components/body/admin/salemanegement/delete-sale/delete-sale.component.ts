import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';

@Component({
  selector: 'app-delete-sale',
  templateUrl: './delete-sale.component.html',
  styleUrls: ['./delete-sale.component.scss']
})
export class DeleteSaleComponent implements OnInit {

  @Input() sale: Sale;

  constructor(private salesService: SalesService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteModal) {
    this.modalService.open(confirmDeleteModal, {centered: true});
  }

  confirmDelete() {
    this.salesService.confirmDelete(this.sale);
  }
}
