import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormatService} from '../../../../../services/product/format.service';
import {Format} from '../../../../../models/products/format';

@Component({
  selector: 'app-delete-format',
  templateUrl: './delete-format.component.html',
  styleUrls: ['./delete-format.component.scss']
})
export class DeleteFormatComponent implements OnInit {

  @Input() format: Format;

  constructor(private formatService: FormatService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteTag) {
    this.modalService.open(confirmDeleteTag, {centered: true});
  }

  confirmDelete() {
    this.formatService.confirmDelete(this.format);
  }
}
