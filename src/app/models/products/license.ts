import {DocumentReference} from '@angular/fire/firestore';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {Format} from './format';
import {Tag} from './tag';

export interface License {
  id?: string;
  name: string;
  tagRef: Tag[];
  formatRef: Format;
  created: Timestamp;
}
