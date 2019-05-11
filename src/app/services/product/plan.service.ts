import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Plan} from '../../models/products/plan';
import {map} from 'rxjs/operators';
import {alerts} from '../../models/alerts';
import {MessageService} from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private plans: Observable<Plan[]>;

  constructor(private afs: AngularFirestore,
              private messageService: MessageService) {
  }

  getPlans(): Observable<Plan[]> {
    return this.plans = this.afs.collection('plans').snapshotChanges().pipe(
      map(plans => {
        return plans.map(plan => {
          return {
            id: plan.payload.doc.id,
            ...plan.payload.doc.data()
          } as Plan;
        });
      })
    );
  }

  addPlan(plan: Plan) {
    this.afs.collection('plans').add(Object.assign({}, plan));
    this.messageService.add(plan.title + ' was successfully added!', alerts.success);
  }

  async confirmDelete(plan: Plan) {
    console.log(plan.id);
    const usedInSale = await this.afs.collection('sales').ref.where('saleObjects', 'array-contains', plan)
      .get().then(res => {
        return !res.empty as boolean;
      });
    if (usedInSale) {
      this.messageService.add(plan.title + ' is used in a sale, please remove sale first!', alerts.danger);
    } else {
      this.afs.collection('plans').doc(plan.id).delete();
      this.messageService.add(plan.title + ' was successfully deleted!', alerts.success);
    }
  }
}

