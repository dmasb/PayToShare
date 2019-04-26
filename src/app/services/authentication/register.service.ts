import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {IUser, User} from '../../models/user';
import {Userrank} from '../../models/userrank';
import {Sex} from '../../models/sex';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
  }

  addUser(email: string, password: string, name: string, phon: number): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.afAuth.auth.currentUser.sendEmailVerification();
      this.router.navigate(['/mypage']);

      const tempUser: IUser = {
        id: this.afAuth.auth.currentUser.uid,
        rank: Userrank.User,
        phone: phon,
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
    }).catch((error) => {
      alert(error);
    });
  }
}
