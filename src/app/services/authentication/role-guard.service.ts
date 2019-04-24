import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  user: IUser;

  //Inject dependencies
  constructor(private auth: AngularFireAuth, private router: Router, private afs: AngularFirestore){}

  // Get user from Auth-service
  async getUser(): Promise<IUser>{
    try {
      this.user = await JSON.parse(JSON.stringify(this.afs.collection('users').doc(this.auth.auth.currentUser.uid).get()));
    }
    catch (err) {
      console.log("Could not fetch user." + err.toString());
    }
    return this.user;
  }


}
