import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormatService} from '../../../../../services/product/format.service';

@Component({
  selector: 'app-delete-format',
  templateUrl: './delete-format.component.html',
  styleUrls: ['./delete-format.component.scss']
})
export class DeleteFormatComponent implements OnInit {

  @Input() id: string;
  @Input() format: string;

  constructor(private formatService: FormatService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteTag) {
    this.modalService.open(confirmDeleteTag, {centered: true});
  }

  requestDeleteTag(tagID) {
    this.formatService.available(tagID);
  }

  confirmDelete() {
    this.formatService.remove();
  }

  cancelDelete() {
    this.formatService.cancel();
  }
}
