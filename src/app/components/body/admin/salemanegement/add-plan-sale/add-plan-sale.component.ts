import {Component, Input, OnInit} from '@angular/core';
import {Plan} from '../../../../../models/products/plan';
import {FormControl, FormGroup} from '@angular/forms';
import {SalesService} from '../../../../../services/product/sales.service';
import {Sale} from '../../../../../models/products/sale';
import {SaleType} from '../../../../../models/saleType';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {Time} from '@angular/common';

@Component({
  selector: 'app-add-plan-sale',
  templateUrl: './add-plan-sale.component.html',
  styleUrls: ['./add-plan-sale.component.scss']
})
export class AddPlanSaleComponent implements OnInit {

  @Input() plans: Plan[];
  private selectedPlans: Plan[] = [];

  private newPlanSale = new FormGroup({
    saleName: new FormControl(''),
    saleBegin: new FormControl(''),
    saleEnd: new FormControl(''),
    saleDiscount: new FormControl(''),
    selectedPlan: new FormControl('')
  });

  constructor(private salesService: SalesService) {
  }

  ngOnInit() {
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

    const plansToSale: string[] = [];
    this.selectedPlans.forEach(plan => plansToSale.push(plan.id));

    const sale = new Sale();
    sale.name = sName;
    sale.type = SaleType.PLAN;
    sale.begins = sBegin;
    sale.ends = sEnd;
    sale.discount = sDiscount;
    sale.salesObjectsIDs = plansToSale;
    sale.created = Timestamp.now();

    this.salesService.addSale(sale);
    this.newPlanSale.reset();
    this.selectedPlans = [];
  }
}
