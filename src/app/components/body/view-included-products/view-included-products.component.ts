import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-included-products',
  templateUrl: './view-included-products.component.html',
  styleUrls: ['./view-included-products.component.scss']
})
export class ViewIncludedProductsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openCenteredDialog(viewIncludedProducts) {
    this.modalService.open(viewIncludedProducts, {centered: true});
    return false;
  }
}
