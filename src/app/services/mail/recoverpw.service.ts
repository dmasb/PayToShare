import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecoverpwService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  private isValid: boolean;

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
        this.isValid = true;
      })
      .catch((error) => {
        this.isValid = false;
        console.log(error);
      });

  }

  isValidEmail(): boolean {
    return this.isValid;
  }
}
