import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
<<<<<<< HEAD
=======
import {Router} from '@angular/router';
>>>>>>> 72e71021a0adb1602d219e579cd6f5742a367748

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth) {
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
<<<<<<< HEAD
=======

     this.afAuth.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigate(['mypage']);
      }});
>>>>>>> 72e71021a0adb1602d219e579cd6f5742a367748
  }

  getLoggedInGoogleUser() {
    return this.afAuth.authState;
  }

  loginFacebook() {
<<<<<<< HEAD
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());
=======
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider()).then(success => {
      console.log(success);
    });
>>>>>>> 72e71021a0adb1602d219e579cd6f5742a367748
  }

  getLoggedInFacebookUser() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

