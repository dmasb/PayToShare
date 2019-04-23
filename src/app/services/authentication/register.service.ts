import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
  }

  user = new User();

  addUser(email: string, password: string, name: string, phone: number): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.afAuth.auth.currentUser.sendEmailVerification();
      this.router.navigate(['/mypage']);

      /* Creates unique entry for User in FireStore
      *  This connects the oAuth User with the FireStore user meaning that
      *  we can provide additional information about the user in FireStore with the same Unique ID.
      * */
      this.user.setName(name)
      this.user.setPhone(phone);
      return this.afs.collection('users').doc(cred.user.uid).set(Object.assign({}, this.user));
    }).catch((error) => {
      // Registration failed.
      // this.router.navigate(['/login']);
      const errorCode = error.code;
      const errorMessage = errorCode.message;
      alert(error);
    });
  }
}
