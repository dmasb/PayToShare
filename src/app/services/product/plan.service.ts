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
  private planBeingDeleted: string;

  constructor(private afs: AngularFirestore) {
    this.planBeingDeleted = null;
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

  getPlanDoc(tagID: string) {
    return this.afs.doc(`plans/${tagID}`);
  }

  getPlanJson(planID: string) {
    return this.afs.doc(`plans/${planID}`).ref.get().then(plan => {
      return {
        id: plan.id,
        ...plan.data()
      };
    });
  }

  addPlan(plan: Plan) {
    console.log('heeeeeeeeeere');
    this.afs.collection('plans').add(plan);
  }

  available(planID: string): boolean {
    if (this.planBeingDeleted === null) {
      this.planBeingDeleted = planID;
      return true;
    } else {
      return false;
    }
  }

  remove() {
    console.log('HEREEEEEEEEEEE');
    console.log('ID: ' + this.planBeingDeleted);
    this.afs.doc(`plans/${this.planBeingDeleted}`).delete();
    this.planBeingDeleted = null;
  }

  cancel() {
    this.planBeingDeleted = null;
  }

  updatePlan(planID: string, planName: string) {
    this.afs.doc(`plans/${planID}`).update({
      name: planName
    });
  }
}

