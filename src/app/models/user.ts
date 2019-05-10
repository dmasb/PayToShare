import {Userrank} from './userrank';
import {Sex} from './sex';
import {firestore} from 'firebase/app';
import {ICart} from "./products/cart";
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
  cart?: ICart;
}

export class User implements IUser{
  constructor(){
  }

  id?: string;
  rank: Userrank = Userrank.User;
  email: string = null;
  firstName: string = null;
  lastName: string = null;
  photoURL?: string = null;
  registerDate? = null;
  sex?: Sex = null;
  address?: string = 'N/A';
  city?: string = 'N/A';
  zipcode?: number = 123456;
  country?: string = 'N/A';
  phone?: number = null;
  loggedIn?: boolean;
  lastLogin?: Timestamp;
  sessionID?: number = null;
  cart?: ICart = null;
}
