import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  addUser(email: string, password: string): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.afAuth.auth.currentUser.sendEmailVerification();
      this.router.navigate(['/mypage']);
    }).catch((error) => {
      // Registration failed.
      // this.router.navigate(['/login']);
      const errorCode = error.code;
      const errorMessage = errorCode.message;
      alert(error);
    });
  }
}
