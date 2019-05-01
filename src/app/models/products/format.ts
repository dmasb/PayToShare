import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';

export interface Format {
  id?: string;
  name: string;
  created?: Timestamp;
}
