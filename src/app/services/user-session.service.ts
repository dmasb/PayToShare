import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {IUser, User} from '../models/user';
import {Observable, of} from 'rxjs';
import {Cart} from '../models/products/cart';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserSessionService implements OnInit {

  private userID;
  private collection;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.userID = this.afAuth.auth.currentUser.uid;
    this.collection = this.afs.collection('users');
  }

  getUserDoc(): Observable<User> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Fetch the user document and listen to value changes.
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          // This should never happen!
          return of(null);
        }
      })
    );
  }


  updateUser(updatedUser: IUser): boolean {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${updatedUser.id}`);
    userRef.ref.get().then(userDocument => {
      console.log('TEEEEEEEEEEEEST');
      if (userDocument.exists) {
        userRef.update(Object.assign({}, updatedUser));
        return true;
      }
    });
    return false;
  }

  async updateCart(cart: Cart) {
    await this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).update({
      cart: Object.assign({}, cart)
    });
  }
}
