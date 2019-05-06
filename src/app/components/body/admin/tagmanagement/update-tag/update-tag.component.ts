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
    tagID: new FormControl(''),
    tagName: new FormControl('')
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
      this.newTagNameForm.controls.tagID.value,
      this.newTagNameForm.controls.tagName.value);
    this.modalService.dismissAll();
  }
}
