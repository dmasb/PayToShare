import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  loginFacebook(){
    this.afAuth.auth.signInWithRedirect( new auth.FacebookAuthProvider()).then(success => {
      console.log(success);
    });
  }

  getLoggedInFacebookUser(){
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

