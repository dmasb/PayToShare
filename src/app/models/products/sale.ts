import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {License} from './license';
import {Tag} from './tag';
import {Format} from './format';

export interface Sale {
  id?: string;
  name: string;
  licenseRef: License;
  tagRef: Tag;
  formatRef: Format;
  created: Timestamp;
}
