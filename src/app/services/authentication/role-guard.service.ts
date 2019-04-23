import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {Userlevel} from "../../models/userlevel";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  //Inject dependencies
  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore){}

  // Get user from Auth-service
  // Get


}
