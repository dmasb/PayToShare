import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';
import {DocumentReference} from '@angular/fire/firestore';

export interface Format {
  id?: string;
  format: string;
  tagRef: DocumentReference;
  created?: Timestamp;
}
