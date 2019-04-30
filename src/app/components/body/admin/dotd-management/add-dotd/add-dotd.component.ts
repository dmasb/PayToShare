import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-dotd',
  templateUrl: './add-dotd.component.html',
  styleUrls: ['./add-dotd.component.scss']
})
export class AddDotdComponent implements OnInit {

  newDotdForm = new FormGroup({
    dotdNameOne: new FormControl(''),
    dotdNameTwo: new FormControl(''),
    dotdNameThree: new FormControl('')
  });

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  openCenteredDialog(addTagModal) {
    this.modalService.open(addTagModal, {centered: true});
    return false;
  }
}
