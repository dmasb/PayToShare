import {Userrank} from './userrank';
import {Sex} from './sex';
import Timestamp = firestore.Timestamp;
import {firestore} from "firebase/app";


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
