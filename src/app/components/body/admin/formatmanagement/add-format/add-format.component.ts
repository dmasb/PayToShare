import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormatService} from '../../../../../services/product/format.service';
import {Format} from '../../../../../models/products/format';

@Component({
  selector: 'app-add-format',
  templateUrl: './add-format.component.html',
  styleUrls: ['./add-format.component.scss']
})
export class AddFormatComponent implements OnInit {

  newFormatForm = new FormGroup({
    formatName: new FormControl(''),
  });

  constructor(private formatService: FormatService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  addFormat() {
    const format = new Format();
    format.name = this.newFormatForm.controls.formatName.value;

    this.formatService.addFormat(format);
    this.newFormatForm.reset();
    this.modalService.dismissAll();
  }

  openCenteredDialog(addTagModal) {
    this.modalService.open(addTagModal, {centered: true});
    return false;
  }
}
