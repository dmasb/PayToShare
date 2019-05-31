import {Userrank} from './userrank';
import {Sex} from './sex';
import {firestore} from 'firebase/app';
import {Cart} from './products/cart';
import Timestamp = firestore.Timestamp;


export interface IUser {
  id?: string;
  rank: Userrank;
  email: string;
  firstName: string;
  lastName: string;
  photoURL?: string;
  registerDate?;
  sex?: Sex;
  address?: string;
  city?: string;
  zipcode?: number;
  country?: string;
  phone?: number;
  loggedIn?: boolean;
  lastLogin?: Timestamp;
  sessionID?: number;
  cart?: Cart;
}

export class User implements IUser {
  address: string;
  cart: Cart;
  city: string;
  country: string;
  email: string;
  firstName: string;
  id: string;
  lastLogin: firebase.firestore.Timestamp;
  lastName: string;
  loggedIn: boolean;
  phone: number;
  photoURL: string;
  rank: Userrank;
  registerDate;
  sessionID: number;
  sex: Sex;
  zipcode: number;

  constructor() {
    this.rank = Userrank.User;
    this.address = 'N/A';
    this.city = 'N/A';
    this.country = 'N/A';
    this.zipcode = 123456;
    this.cart = new Cart();
    this.photoURL = 'https://firebasestorage.googleapis.com/v0/b/paytoshare-b4cd1.appspot.com/o/userImages%2Fblank-' +
      'profile-picture-973460_960_720.png?alt=media&token=1140f0f7-d7d0-4c05-a777-259c682ab7f1';
  }
}
