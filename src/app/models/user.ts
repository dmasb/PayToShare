import {Userrank} from './userrank';
import {Sex} from './sex';
import DateTimeFormat = Intl.DateTimeFormat;

export interface IUser {

  rank: Userrank;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  address?: string;
  phone: number;
  zipcode: number;
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

  get zipcode(): number {
    return this.data.zipcode;
  }

  get country(): string {
    return this.data.country;
  }
}
