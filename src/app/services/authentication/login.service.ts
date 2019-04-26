import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {RegisterService} from "./register.service";
import {AngularFirestore} from '@angular/fire/firestore';
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uid: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private regService: RegisterService) {
  }

  login(email: string, password: string) {
    return new Promise(() => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(success => {
          console.log('Log in success, redirecting');
        }, failed => {
          console.warn('Wrong email or password');
        });
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    this.afAuth.auth.getRedirectResult().then(cred => {
      if(cred){
        if (!this.regService.userExists(cred.user.uid)) {
          this.regService.addUserNoInfo(cred);
        }
      }
    });
  }

  getLoggedInGoogleUser() {
    return this.afAuth.authState;
  }

  loginFacebook() {
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());
    this.afAuth.auth.getRedirectResult().then(cred => {
      if(cred){
        if (!this.regService.userExists(cred.user.uid)) {
          this.regService.addUserNoInfo(cred);
        }
      }
    });
  }

  getLoggedInFacebookUser() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

