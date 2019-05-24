import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';
import {Tag} from '../../../../../models/products/tag';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-update-tag',
  templateUrl: './update-tag.component.html',
  styleUrls: ['./update-tag.component.scss']
})
export class UpdateTagComponent implements OnInit {

  @Input() tag: Tag;

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

    if (this.newTagNameForm.controls.tagName.value) {
      const newTag: Tag = cloneDeep(this.tag);
      newTag.name = this.newTagNameForm.controls.tagName.value;

      this.tagService.updateTag(this.tag, newTag);
    }

    this.modalService.dismissAll();
    this.newTagNameForm.reset();
  }
}
