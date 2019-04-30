import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';

@Component({
  selector: 'app-delete-tag',
  templateUrl: './delete-tag.component.html',
  styleUrls: ['./delete-tag.component.scss']
})
export class DeleteTagComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;

  constructor(private tagService: TagService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  openCenteredDialog(confirmDeleteTag) {
    this.modalService.open(confirmDeleteTag, {centered: true});
  }

  requestDeleteTag(tagID) {
    this.tagService.available(tagID);
  }

  confirmDelete() {
    this.tagService.remove();
  }

  cancelDelete() {
    this.tagService.cancel();
  }
}
