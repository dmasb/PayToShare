import {DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface License {
  id?: string;
  name: string;
  tagRef: DocumentReference;
  formatRef: DocumentReference;
  created: Timestamp;
}
