import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {AngularFirestore} from '@angular/fire/firestore';

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
          console.log('Log in success, redirecting');
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
    this.afAuth.authState.subscribe((id) => {
      if (id) {
        this.uid = id.uid;
        alert(this.uid);
      }
    });
    if (this.queryUserExists(this.uid)) {
      alert(this.uid);
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

