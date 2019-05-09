import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;


export interface LicenseModel {
  id?: string;
  name: string;
  tagID: string;
  formatID: string;
  created: Timestamp;
}


export class License implements LicenseModel {
  constructor() {
  }

  id?: string;
  name: string;
  tagID: string;
  formatID: string;
  created: Timestamp;
}
