import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';
import {Plan} from './products/plan';
import {License} from './products/license';

interface SubscriptionModel {
  userID: string;
  validFrom: Timestamp;
  validTo: Timestamp;
}

export class PlanSubscription implements SubscriptionModel {
  id?: string;
  objectID: string;
  userID: string;
  validFrom: firebase.firestore.Timestamp;
  validTo: firebase.firestore.Timestamp;
  plan: Plan;

  constructor(userID: string, objectID: string, plan: Plan, validTo: Timestamp) {
    this.userID = userID;
    this.objectID = objectID;
    this.plan = plan;
    this.validFrom = Timestamp.now();
    this.validTo = validTo;
  }
}

export class LicenseSubscription implements SubscriptionModel {
  id?: string;
  objectID: string;
  userID: string;
  validFrom: firebase.firestore.Timestamp;
  validTo: firebase.firestore.Timestamp;
  license: License;

  constructor(userID: string, objectID: string, license: License, validTo: Timestamp) {
    this.userID = userID;
    this.objectID = objectID;
    this.license = license;
    this.validFrom = Timestamp.now();
    this.validTo = validTo;
  }
}
