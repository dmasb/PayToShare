import {Userlevel} from './userlevel';
import {Sex} from "./sex";
import DateTimeFormat = Intl.DateTimeFormat;


export class User {

  private userLevel?: Userlevel = Userlevel.User;
  private firstName?: String = "";
  private lastName?: String = "";
  private city?: string = "";
  private address?: String = "";
  private phone: number = null;
  private sex?: Sex = null;
  private lastLogin?: DateTimeFormat;
  private loggedIn?: boolean = false;
  private sessionID?: number;

  isAdmin (): boolean {
    return this.userLevel === Userlevel.Admin;
  }

  isLoggedIn (): boolean {
    return this.loggedIn;
  }

  getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  getSession (): number {
    return this.sessionID;
  }

  getLastOnline(): DateTimeFormat {
    return this.lastLogin;
  }

  setName(name: string){
    this.firstName = name;
  }

  setPhone(number: number){
    this.phone = number;
  }








}
