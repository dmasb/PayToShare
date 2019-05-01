import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Format} from '../../../../../models/products/format';
import {FormatService} from '../../../../../services/product/format.service';
import {Observable} from 'rxjs';
import {Tag} from '../../../../../models/products/tag';

@Component({
  selector: 'app-format-overview',
  templateUrl: './format-overview.component.html',
  styleUrls: ['./format-overview.component.scss']
})
export class FormatOverviewComponent implements OnInit {

  private formats: Observable<Format[]>;

  constructor(pipe: DecimalPipe, private formatService: FormatService) {
  }

  ngOnInit() {
    this.formats = this.formatService.getFormats();
  }

}
