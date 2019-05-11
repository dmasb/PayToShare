import {License} from './license';
import {Item} from './item';

export class Plan implements Item {
  id?: string;
  title: string;
  speed: number;
  price: number;
  licenses: License[];
  quantity: number;
  description: string;
  imageUrl: string;
  created: firebase.firestore.Timestamp;

  constructor() {
    this.title = 'Plan name';
    this.speed = 0;
    this.price = 0;
    this.quantity = 0;
    this.description = 'Plan Description';
    this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com/o/' +
      'productImage%2Fitemimg.svg?alt=media&token=130ed9f0-6e1a-4d93-abf3-62d77de18599';
  }
}
