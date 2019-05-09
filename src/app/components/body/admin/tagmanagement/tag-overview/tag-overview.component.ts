import {Component, OnInit} from '@angular/core';
import {Tag} from '../../../../../models/products/tag';
import {TagService} from '../../../../../services/product/tag.service';
import {MessageService} from '../../../../../services/message.service';

@Component({
  selector: 'app-tag-overview',
  templateUrl: './tag-overview.component.html',
  styleUrls: ['./tag-overview.component.scss']
})
export class TagOverviewComponent implements OnInit {

  private tags: Tag[];

  constructor(private tagService: TagService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }
}
