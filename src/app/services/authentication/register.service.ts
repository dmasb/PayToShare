import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore} from "@angular/fire/firestore";
import {IUser, User} from "../../models/user";
import {Userrank} from "../../models/userrank";
import {Sex} from "../../models/sex";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
  }

  user: IUser;

  addUserWithInfo(email: string, password: string, name: string, phone: number): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.afAuth.auth.currentUser.sendEmailVerification();
      this.router.navigate(['/mypage']);

      /* Creates unique entry for User in FireStore
      *  This connects the oAuth User with the FireStore user meaning that
      *  we can provide additional information about the user in FireStore with the same Unique ID.
      * */
      this.user = <IUser> {
        rank: Userrank.User,
        phone: phone,
        firstName: name,
        lastName: null,
        city: null,
        address: null,
        sex: null,
        lastLogin: null,
        loggedIn: null,
        sessionID: null
      };
      return this.afs.collection('users').doc(cred.user.uid).set(Object.assign( {}, this.user));
    }).catch((error) => {
      // Registration failed.
      // this.router.navigate(['/login']);
      const errorCode = error.code;
      const errorMessage = errorCode.message;
      alert(error);
    });
  }

  async addUserNoInfo(user) {
    /* Creates unique entry for User in FireStore
      *  This connects the oAuth User with the FireStore user meaning that
      *  we can provide additional information about the user in FireStore with the same Unique ID.
      * */
      this.user = <IUser>{
        rank: Userrank.User,
        phone: null,
        firstName: null,
        lastName: null,
        city: null,
        address: null,
        sex: null,
        lastLogin: null,
        loggedIn: null,
        sessionID: null
      };
      return this.afs.collection('users').doc(user.user.uid).set(Object.assign( {}, this.user));

  }

  userExists(uid: string): boolean {
      let userRef = this.afs.collection('users').doc(uid);
      let getDoc = userRef.get()
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
}
