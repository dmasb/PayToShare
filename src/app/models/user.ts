import {Userrank} from './userrank';
import {Sex} from './sex';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

export interface IUser {
  id?: string;
  rank?: Userrank;
  email?: string;
  firstName?: string;
  lastName?: string;
  sex?: Sex;
  address?: string;
  city?: string;
  phone?: number;
  loggedIn?: boolean;
  lastLogin?: Timestamp;
  sessionID?: number;
}

export class User implements IUser {
  id?: string;
  rank?: Userrank;
  email?: string;
  firstName?: string;
  lastName?: string;
  sex?: Sex;
  address?: string;
  city?: string;
  phone?: number;
  loggedIn?: boolean;
  lastLogin?: Timestamp;
  sessionID?: number;


  constructor(private data: IUser) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.loggedIn = data.loggedIn;
    this.sessionID = data.sessionID;
  }
}
