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
  constructor() {
    this.cart = new Cart();
  }

  id?: string;
  rank: Userrank = Userrank.User;
  email: string = null;
  firstName: string = null;
  lastName: string = null;
  photoURL?: string = null;
  registerDate = null;
  sex?: Sex = null;
  address = 'N/A';
  city = 'N/A';
  zipcode = 123456;
  country = 'N/A';
  phone?: number = null;
  loggedIn?: boolean;
  lastLogin?: Timestamp;
  sessionID?: number = null;
  cart?: Cart = null;
}
