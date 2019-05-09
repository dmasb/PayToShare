import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Plan} from '../../models/products/plan';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private plans: Observable<Plan[]>;

  constructor(private afs: AngularFirestore) {
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
  }

  confirmDelete(plan: Plan) {
    const usedInSale = this.afs.collection('sales').ref.where('salesObjectsIDs', 'array-contains', plan.id)
      .get().then(res => {
        return !res.empty as boolean;
      });
    if (usedInSale) {
      console.log('Plan is used in a sale, please remove sale first!');
    } else {
      this.afs.collection('plans').doc(plan.id).delete();
    }
  }
}

