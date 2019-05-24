import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface Item {
  id?: string;
  title: string;
  price: number;
  quantity?: number;
  created?: Timestamp;
  description: string;
  imageUrl: string;
  salesID?: string;
}
