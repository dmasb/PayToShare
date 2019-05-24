import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';
import {Cart} from './products/cart';

export interface OrderModel {
  id?: string;
  uid: string;
  cart: Cart;
  created?: Timestamp;
}

export class Order implements OrderModel {
  id?: string;
  cart: Cart;
  created: firebase.firestore.Timestamp;
  uid: string;

  constructor(uid: string, cart: Cart) {
    this.uid = uid;
    this.cart = cart;
    this.created = Timestamp.now();
  }
}
