import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {DecimalPipe} from '@angular/common';
import {TagService} from '../../../../../services/product/tag.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tag-overview',
  templateUrl: './tag-overview.component.html',
  styleUrls: ['./tag-overview.component.scss']
})
export class TagOverviewComponent implements OnInit {

  tags: Observable<Tag[]>;

  constructor(pipe: DecimalPipe, private tagService: TagService) {
  }

  ngOnInit() {
    this.tags = this.tagService.getTags();
  }
}
