import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';

export interface TagModel {
  id?: string;
  name: string;
  created?: Timestamp;
  salesID?: string;
  products?: number;
}

export class Tag implements TagModel {
  constructor() {
  }

  id?: string;
  name: string;
}
