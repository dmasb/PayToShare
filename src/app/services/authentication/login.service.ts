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
    await this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
    this.afAuth.auth.getRedirectResult().then(cred => {
      if (cred) {
        if (!this.regService.userExists(cred.user.uid)) {
          this.regService.addUserNoInfo(cred).then(() => console.log('Successfully added user.'))
            .catch((err) => console.log('Could not add user. ' + err.toString()));
        }
      }
    });
  }

  getLoggedInGoogleUser() {
    return this.afAuth.authState;
  }

  async loginFacebook() {
    await this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());
    // cant get redirect results if sign-in not awaited.
    this.afAuth.auth.getRedirectResult().then(cred => {
      if (cred) {
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

