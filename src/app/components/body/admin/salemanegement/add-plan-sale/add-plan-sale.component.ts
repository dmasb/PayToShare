import {Component, Input, OnInit} from '@angular/core';
import {Plan} from '../../../../../models/products/plan';
import {FormControl, FormGroup} from '@angular/forms';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {alerts} from '../../../../../models/alerts';
import {MessageService} from '../../../../../services/message.service';

@Component({
  selector: 'app-add-plan-sale',
  templateUrl: './add-plan-sale.component.html',
  styleUrls: ['./add-plan-sale.component.scss']
})
export class AddPlanSaleComponent implements OnInit {

  @Input() plans: Plan[];
  private selectedPlans: Plan[] = [];
  private sales: Sale[];
  private newPlanSale = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedPlan: new FormControl('')
  });

  constructor(private salesService: SalesService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.salesService.getAllSales().subscribe(sales => this.sales = sales);
  }


  pushPlan() {
    if (this.newPlanSale.controls.selectedPlan.value) {
      const selected: Plan = JSON.parse(this.newPlanSale.controls.selectedPlan.value);
      if (this.selectedPlans.findIndex(plan => plan.id === selected.id) === -1) {
        this.selectedPlans.push(selected);
      }
    }
  }

  popPlan(plan: Plan) {
    this.selectedPlans = this.selectedPlans.filter(each => each !== plan);
  }

  addPlanSale() {
    const sName = this.newPlanSale.controls.saleName.value;
    const sBegin = this.newPlanSale.controls.saleBegin.value;
    const sEnd = this.newPlanSale.controls.saleEnd.value;
    const sDiscount = this.newPlanSale.controls.saleDiscount.value;


    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.PLAN;
    sale.begins = Timestamp.fromDate(new Date(sBegin));
    sale.ends = Timestamp.fromDate(new Date(sEnd));
    sale.saleObjects = this.selectedPlans;
    sale.discount = sDiscount;


    const saleArray: Sale[] = [];
    const planArray: Plan[] = [];

    for (const plan of this.selectedPlans) {
      for (const o of this.sales) {
        if (o.type === SaleType.PLAN) {
          const tempPlans = o.saleObjects as Plan[];
          const isListed = tempPlans.filter(l => l.id === plan.id).length > 0;
          if (isListed && sale.begins >= o.begins && sale.begins <= o.ends) {
            saleArray.push(o);
            planArray.push(plan);
          }
        }
      }
    }


    if (saleArray.length === 0 && planArray.length === 0) {

      this.salesService.addSale(sale);
      this.newPlanSale.reset();
      this.selectedPlans = [];
    } else {
      let str = '';
      let index = 0;
      while (index < saleArray.length) {
        str += planArray[index].title + ' is already listed in ' + saleArray[index].name + ' in this period;';
        index++;
      }
      this.messageService.add(str, alerts.danger);
    }
  }
}
