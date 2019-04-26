import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
<<<<<<< HEAD
import {AngularFirestore} from '@angular/fire/firestore';
import {IUser, User} from '../../models/user';
import {Userrank} from '../../models/userrank';
import {Sex} from '../../models/sex';
=======
import {AngularFirestore} from "@angular/fire/firestore";
import {IUser, User} from "../../models/user";
import {Userrank} from "../../models/userrank";
import {Sex} from "../../models/sex";
>>>>>>> 64502dcaf28f2a2286947725f6741ddd0cc1f756

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
  }

<<<<<<< HEAD
  addUser(email: string, password: string, name: string, phon: number): void {
=======
  user: IUser;

  addUserWithInfo(email: string, password: string, name: string, phone: number): void {
>>>>>>> 64502dcaf28f2a2286947725f6741ddd0cc1f756
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.afAuth.auth.currentUser.sendEmailVerification();
      this.router.navigate(['/mypage']);

      const tempUser: IUser = {
        id: this.afAuth.auth.currentUser.uid,
        rank: Userrank.User,
<<<<<<< HEAD
        phone: phon,
=======
        phone: phone,
>>>>>>> 64502dcaf28f2a2286947725f6741ddd0cc1f756
        firstName: name,
        lastName: null,
        city: null,
        address: null,
        sex: null,
        lastLogin: null,
        loggedIn: null,
        sessionID: null
      };
<<<<<<< HEAD
      return this.afs.collection('users').add(tempUser);
=======
      return this.afs.collection('users').doc(cred.user.uid).set(Object.assign( {}, this.user));
>>>>>>> 64502dcaf28f2a2286947725f6741ddd0cc1f756
    }).catch((error) => {
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
