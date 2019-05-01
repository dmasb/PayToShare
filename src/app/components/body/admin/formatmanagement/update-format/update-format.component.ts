import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TagService} from '../../../../../services/product/tag.service';
import {FormControl, FormGroup} from '@angular/forms';
import {FormatService} from '../../../../../services/product/format.service';

@Component({
  selector: 'app-update-format',
  templateUrl: './update-format.component.html',
  styleUrls: ['./update-format.component.scss']
})
export class UpdateFormatComponent implements OnInit {

  @Input() id: string;
  @Input() format: string;
  @Input() currentTag: string;
  @Input() tagID: string;

  private tags: Tag[];

  private updateFormatForm = new FormGroup({
    formatID: new FormControl(''),
    formatName: new FormControl(''),
    formatTagID: new FormControl(''),
  });

  constructor(private modalService: NgbModal,
              private tagService: TagService,
              private formatService: FormatService) {

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

  openCenteredDialog(editTagModal) {
    this.modalService.open(editTagModal, {centered: true});
  }

  editFormat() {
    this.formatService.updateFormat(
      this.updateFormatForm.controls.formatID.value,
      this.updateFormatForm.controls.formatName.value,
      this.updateFormatForm.controls.formatTagID.value || this.tagID,
    );
    this.modalService.dismissAll();
  }

}
