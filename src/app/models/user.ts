import {Userrank} from './userrank';
import {Sex} from './sex';
import DateTimeFormat = Intl.DateTimeFormat;

export interface IUser {

  rank: Userrank;
  firstName?: string;
  lastName?: string;
  city?: string;
  address?: string;
  phone: number;
  sex?: Sex;
  lastLogin?: DateTimeFormat;
  loggedIn?: boolean;
  sessionID?: number;
}

export class User implements IUser {

  constructor(private data: IUser) {

  }

  get rank(): Userrank {
    return this.data.rank;
  }

  get firstname(): string {
    return this.data.firstName;
  }

  get lastname(): string {
    return this.data.lastName;
  }

  get city(): string {
    return this.data.city;
  }

  get address(): string {
    return this.data.address;
  }

  get phone(): number {
    return this.data.phone;
  }

  get sex(): Sex {
    return this.data.sex;
  }

  get lastlogin(): DateTimeFormat {
    return this.data.lastLogin;
  }

  get loggedin(): boolean {
    return this.data.loggedIn;
  }

  get session(): number {
    return this.data.sessionID;
  }

  isAdmin(): boolean {
    return this.rank === Userrank.Admin;
  }

  isLoggedIn(): boolean {
    return this.loggedin;
  }

  getFullName(): string {
    return this.firstname + ' ' + this.lastname;
  }

  getSession(): number {
    return this.session;
  }

  getLastOnline(): DateTimeFormat {
    return this.lastlogin;
  }
}
