import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormatService} from '../../../../../services/product/format.service';
import {MessageService} from '../../../../../services/message.service';
import {Tag} from '../../../../../models/products/tag';
import {TagService} from '../../../../../services/product/tag.service';

@Component({
  selector: 'app-add-format',
  templateUrl: './add-format.component.html',
  styleUrls: ['./add-format.component.scss']
})
export class AddFormatComponent implements OnInit {
  private tags: Tag[];

  newFormatForm = new FormGroup({
    formatName: new FormControl(''),
    tagID: new FormControl('')
  });

  constructor(private formatService: FormatService,
              private messageService: MessageService,
              private tagService: TagService,
              private modalService: NgbModal) {

    this.tagService.getTags().subscribe(tag => {
      this.tags = tag.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Tag;
      });
    });
  }

  ngOnInit() {
  }

  addFormat() {
    const formatName = this.newFormatForm.controls.formatName.value;
    const tagID = this.newFormatForm.controls.tagID.value;

    this.formatService.addFormat(formatName, tagID);
    this.modalService.dismissAll();
  }

  openCenteredDialog(addTagModal) {
    this.modalService.open(addTagModal, {centered: true});
    return false;
  }
}
