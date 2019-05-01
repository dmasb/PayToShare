import {Component, OnInit} from '@angular/core';
import {Format} from '../../../../../models/products/format';
import {DecimalPipe} from '@angular/common';
import {FormatService} from '../../../../../services/product/format.service';
import {Tag} from '../../../../../models/products/tag';
import {TagService} from '../../../../../services/product/tag.service';

@Component({
  selector: 'app-format-overview',
  templateUrl: './format-overview.component.html',
  styleUrls: ['./format-overview.component.scss']
})
export class FormatOverviewComponent implements OnInit {
  private formats: Format[];
  private tags: Tag[];

  constructor(pipe: DecimalPipe,
              private formatService: FormatService,
              private tagService: TagService) {
  }

  private getTagName(tagID: string) {
    return this.tags.filter(tag => {
      if (tag.id === tagID) {
        return tag.name;
      }
    }).pop().name;
  }

  ngOnInit() {
    this.formatService.getFormats().subscribe(tag => {
      this.formats = tag.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Format;
      });
    });

    this.tagService.getTags().subscribe(tag => {
      this.tags = tag.map(obj => {
        return {
          id: obj.payload.doc.id,
          ...obj.payload.doc.data()
        } as Tag;
      });
    });
  }

}
