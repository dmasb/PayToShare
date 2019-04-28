import {Userrank} from './userrank';
import {Sex} from './sex';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;

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
  phone?: number;
  loggedIn?: boolean;
  lastLogin?: Timestamp;
  sessionID?: number;
}
