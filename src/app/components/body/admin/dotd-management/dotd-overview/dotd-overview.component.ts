import { Component, OnInit } from '@angular/core';
import {TagService} from '../../../../../services/product/tag.service';
import {Tag} from '../../../../../models/products/tag';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-dotd-overview',
  templateUrl: './dotd-overview.component.html',
  styleUrls: ['./dotd-overview.component.scss']
})
export class DotdOverviewComponent implements OnInit {

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
