import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {IUser, User} from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
  }


  addUserWithInfo(user: IUser, password: string): void {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, password).then(cred => {
      this.afAuth.auth.currentUser.sendEmailVerification();
      this.router.navigate(['/home']);
      return this.afs.collection('users').doc(cred.user.uid).set(user);
    }).catch((error) => {
      console.log('Register failed');
      console.log('Register failed');
      console.log('Register failed');
      console.log('Register failed');
      alert(error);
    });
  }
}
