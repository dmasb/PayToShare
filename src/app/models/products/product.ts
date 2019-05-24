import {Item} from './item';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {Tag} from './tag';
import {Format} from './format';

export class Product implements Item {
  id?: string;
  title: string;
  price: number;
  quantity: number;
  tags: Tag[];
  format: Format;
  description: string;
  salesID: string;
  imageUrl: string;
  created?: Timestamp;

  constructor() {
    this.price = 0;
    this.quantity = 0;
    this.salesID = 'none';
    this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com' +
      '/o/productImage%2Fgd.png?alt=media&token=b2ddece0-7aa1-43c8-8a83-e0e2930d5b7d';
  }
}
