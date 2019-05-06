import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';

export interface Tag {
  id?: string;
  name: string;
  created?: Timestamp;
  products?: number;
}
