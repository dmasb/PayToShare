import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';


@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

  newTagForm = new FormGroup({
    formatName: new FormControl(''),
  });

  constructor(private tagService: TagService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  addTag() {
    this.tagService.addTag(this.newTagForm.controls.formatName.value);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addTagModal) {
    this.modalService.open(addTagModal, {centered: true});
    return false;
  }
}
