import { Injectable } from '@angular/core';
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
      map(tags => {
        return tags.map(tag => {
          return {
            id: tag.payload.doc.id,
            ...tag.payload.doc.data()
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
    this.afs.doc(`plans/${this.planBeingDeleted}`).delete();
    this.planBeingDeleted = null;
  }

  cancel() {
    this.planBeingDeleted = null;
  }

  updatePlan(planID: string, planName: string) {
    this.afs.doc(`tags/${planID}`).update({
      name: planName
    });
  }
}

