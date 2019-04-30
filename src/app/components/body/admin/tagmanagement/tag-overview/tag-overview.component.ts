import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {DecimalPipe} from '@angular/common';
import {TagService} from '../../../../../services/product/tag.service';

@Component({
  selector: 'app-tag-overview',
  templateUrl: './tag-overview.component.html',
  styleUrls: ['./tag-overview.component.scss']
})
export class TagOverviewComponent implements OnInit {

  tags: Tag[];

  constructor(pipe: DecimalPipe, private tagService: TagService) {
  }

  ngOnInit() {
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
