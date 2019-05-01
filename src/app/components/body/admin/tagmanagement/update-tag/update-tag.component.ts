import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.scss']
})
export class UpdateTagComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;

  newTagNameForm = new FormGroup({
    formatID: new FormControl(''),
    formatName: new FormControl('')
  });

  constructor(private tagService: TagService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(editTagModal) {
    this.modalService.open(editTagModal, {centered: true});
  }

  editTag() {
    this.tagService.updateTag(
      this.newTagNameForm.controls.formatID.value,
      this.newTagNameForm.controls.formatName.value);
    this.modalService.dismissAll();
  }
}
