import {Userrank} from './userrank';
import {Sex} from './sex';
import Timestamp = firestore.Timestamp;
import {firestore} from 'firebase/app';
import {Cart} from "./products/cart";


export interface IUser {
  id?: string;
  rank: Userrank;
  email: string;
  firstName: string;
  lastName: string;
  photoURL?: string;
  registerDate?: Timestamp;
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
