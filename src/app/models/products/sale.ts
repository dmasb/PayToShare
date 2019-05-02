import {DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Sale {
  id?: string;
  name: string;
  licenseRef: object;
  tagRef: object;
  formatRef: object;
  created: Timestamp;
}