import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {Observable} from 'rxjs';
import {IUser, User} from '../../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Userrank} from '../../models/userrank';
import {RegisterService} from './register.service';


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
          this.uid = this.afAuth.auth.currentUser.uid;
          console.log('Log in success, redirecting');
          console.log(this.uid);
        }, failed => {
          console.warn('Wrong email or password');
        });
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

    this.afAuth.auth.getRedirectResult().then(success => {
      console.log(this.afAuth.auth.currentUser.uid);
      const tempUser: IUser = {
        id: this.afAuth.auth.currentUser.uid,
        rank: Userrank.User,
        phone: 112,
        firstName: name,
        lastName: null,
        city: null,
        address: null,
        sex: null,
        lastLogin: null,
        loggedIn: null,
        sessionID: null
      };
      return this.afs.collection('users').add(tempUser);
    });
  }

  getLoggedInGoogleUser() {
    return this.afAuth.authState;
  }

  loginFacebook() {
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());

    this.afAuth.auth.getRedirectResult().then(success => {
      const tempUser: IUser = {
        id: this.afAuth.auth.currentUser.uid,
        rank: Userrank.User,
        phone: 332,
        firstName: name,
        lastName: null,
        city: null,
        address: null,
        sex: null,
        lastLogin: null,
        loggedIn: null,
        sessionID: null
      };
      return this.afs.collection('users').add(tempUser);
    });
  }

  getLoggedInFacebookUser() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

