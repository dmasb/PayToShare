import {Component, OnInit} from '@angular/core';
import {Sale} from '../../../../../models/products/sale';
import {FormatService} from '../../../../../services/product/format.service';
import {Observable} from 'rxjs';
import { SalesService } from 'src/app/services/product/sales.service';

@Component({
  selector: 'app-dotd-overview',
  templateUrl: './dotd-overview.component.html',
  styleUrls: ['./dotd-overview.component.scss']
})
export class DotdOverviewComponent implements OnInit {

  sales: Observable<Sale[]>;
  name: string;

  constructor(private saleService: SalesService) {
  }

  ngOnInit() {
    this.sales = this.saleService.getSales();
  }

}
