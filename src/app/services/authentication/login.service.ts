import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {Observable} from 'rxjs';
import {IUser, User} from '../../models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Userrank} from '../../models/userrank';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uid: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
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

  queryUserExists(uid: string): boolean {
    const userRef = this.afs.collection('users').doc(uid);
    userRef.get()
      .subscribe(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          return false;
        } else {
          console.log('User exists');
          return true;
        }
      });
    return false;
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

