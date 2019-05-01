import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Format} from '../../../../../models/products/format';
import {FormatService} from '../../../../../services/product/format.service';

@Component({
  selector: 'app-format-overview',
  templateUrl: './format-overview.component.html',
  styleUrls: ['./format-overview.component.scss']
})
export class FormatOverviewComponent implements OnInit {

  formats: Format[];

  constructor(pipe: DecimalPipe, private formatService: FormatService) {
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
  }

}
