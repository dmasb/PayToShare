import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';

export interface FormatModel {
  id?: string;
  name: string;
  created?: Timestamp;
}

export class Format implements FormatModel {
  constructor() {

  }

  id?: string;
  name: string;
}
