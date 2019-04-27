import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {IUser} from '../models/user';
import {Observable} from 'rxjs';
import Timestamp = firebase.firestore.Timestamp;
import {Userrank} from '../models/userrank';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private user: Observable<IUser>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  currentUser(): Observable<IUser> {
    const userID = this.afAuth.auth.currentUser.uid;
    const collection = this.afs.collection('users');
    collection.doc(userID).get().subscribe(userDocument => {
      if (!userDocument.exists) {
        // Then we make a document for the user (first time logging in)
        const newUser: IUser = {
          id: this.afAuth.auth.currentUser.uid,
          email: this.afAuth.auth.currentUser.email,
          firstName: this.afAuth.auth.currentUser.displayName,
          lastLogin: Timestamp.now(),
          loggedIn: true,
          rank: Userrank.User,
          sessionID: null,
        };
        // And add it to the users collection
        collection.doc(this.afAuth.auth.currentUser.uid).set(newUser);
      }
    });
    // We make a new fetch of the user document to avoid type-casting from IUser to observable<IUser>
    this.user = this.afs.doc<IUser>(`users/${this.afAuth.auth.currentUser.uid}`).valueChanges();
    return this.user;
  }
}
