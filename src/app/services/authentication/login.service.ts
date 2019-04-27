import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';


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
          console.warn('login success');
        }, failed => {
          console.warn('Wrong email or password');
        });
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  loginFacebook() {
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider());


  }

  logout() {
    this.afAuth.auth.signOut();
  }
}

