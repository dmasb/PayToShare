import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {Tag} from './tag';
import {Format} from './format';


export interface License {
  id?: string;
  name: string;
  tagRef: Tag;
  formatRef: Format;
  created: Timestamp;
}
