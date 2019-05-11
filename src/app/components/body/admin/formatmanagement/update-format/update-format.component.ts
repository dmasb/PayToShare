import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormatService} from '../../../../../services/product/format.service';
import {Format} from '../../../../../models/products/format';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-update-format',
  templateUrl: './update-format.component.html',
  styleUrls: ['./update-format.component.scss']
})
export class UpdateFormatComponent implements OnInit {

  @Input() private format: Format;

  newFormatNameForm = new FormGroup({
    formatID: new FormControl(''),
    formatName: new FormControl('')
  });

  constructor(private formatService: FormatService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(editFormatModal) {
    this.modalService.open(editFormatModal, {centered: true});
  }

  editFormat() {
    if (this.newFormatNameForm.controls.formatName.value) {
      const newFormat: Format = cloneDeep(this.format);
      newFormat.name = this.newFormatNameForm.controls.formatName.value;

      this.formatService.updateFormat(this.format, newFormat);
    }

    this.modalService.dismissAll();
    this.newFormatNameForm.reset();
  }
}
