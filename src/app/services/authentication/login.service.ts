import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {RegisterService} from "./register.service";
import {AngularFirestore} from '@angular/fire/firestore';

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

  async loginGoogle() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()).then(() => {
      this.afAuth.auth.currentUser.getIdToken().then((cred) => {
        if (cred)
          this.uid = cred;
        console.log('ID:' + this.uid)
      });
    });

    if (!this.regService.userExists(this.uid)) {
      this.regService.addUserNoInfo();
    }
  }

  getLoggedInGoogleUser() {
    return this.afAuth.authState;
  }

  loginFacebook() {
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());
  }

  getLoggedInFacebookUser() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

