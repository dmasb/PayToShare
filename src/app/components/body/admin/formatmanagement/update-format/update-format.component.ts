import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormatService} from '../../../../../services/product/format.service';

@Component({
  selector: 'app-update-format',
  templateUrl: './update-format.component.html',
  styleUrls: ['./update-format.component.scss']
})
export class UpdateFormatComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;

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
    this.formatService.updateFormat(
      this.newFormatNameForm.controls.formatID.value,
      this.newFormatNameForm.controls.formatName.value);
    this.modalService.dismissAll();
  }
}
