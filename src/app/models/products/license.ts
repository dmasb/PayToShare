import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {Tag} from './tag';
import {Format} from './format';


export interface LicenseModel {
  id?: string;
  name?: string;
  tag?: Tag;
  format?: Format;
  created?: Timestamp;
}


export class License implements LicenseModel {
  constructor() {
  }

  id?: string;
  name?: string;
  tag?: Tag;
  format?: Format;
}
