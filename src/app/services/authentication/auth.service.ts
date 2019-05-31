import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {IUser, User} from '../../models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';
import {alerts} from '../../models/alerts';
import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
import {Cart} from '../../models/products/cart';
import {Time} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
  This is general dataset (firestore document) every user will have.
  the information provided by facebook or google when upon users first
  log in will be added to this set. Information provided by the user when
  registering manually will also be added to this set.
   */
  private data: IUser = new User(); // Create new InterfaceUser from User which will work with Object.Set
  private user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private messageService: MessageService) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Fetch the user document and listen to value changes.
          return this.afs.doc(`users/${user.uid}`).valueChanges() as Observable<User>;
        } else {
          // This should never happen!
          return of(null);
        }
      })
    );
  }

  // Temporary method
  getCurrentUser(): Observable<User> {
    return this.user;
  }

  state(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return new Promise(() => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(async () => {
          this.messageService.add('Login success', alerts.success);
          await this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).update(
            {
              lastLogin: Timestamp.now(),
              loggedIn: true
            }
          );
          this.router.navigate(['/profile']);
        }, () => {
          this.messageService.add('Wrong email or password', alerts.danger);
        });
    });
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  addUserWithInfo(user: User, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, password).then(async cred => {
      this.afAuth.auth.currentUser.sendEmailVerification();

      // Adding required information to the user document data set mentioned earlier.
      user.id = cred.user.uid;
      user.registerDate = cred.user.metadata.creationTime;
      user.lastLogin = Timestamp.now();
      user.loggedIn = true;
      user.cart = Object.assign({}, user.cart);

      await this.afs.collection('users').doc(cred.user.uid).set(Object.assign({}, user));
      this.router.navigate(['/profile']);
    });
  }

  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);
    userRef.ref.get().then(userDocument => {
      if (userDocument.exists) {
        this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).update(Object.assign({}, {
          lastLogin: Timestamp.now(),
          loggedIn: true
        }));
      } else {
        const displayName = user.displayName.split(' ', 2);
        this.data.id = user.uid;
        this.data.email = user.email;
        this.data.firstName = displayName[0];
        (displayName[1]) ? this.data.lastName = displayName[1] : this.data.lastName = '';
        this.data.photoURL = user.photoURL;
        this.data.lastLogin = Timestamp.now();
        this.data.registerDate = this.afAuth.auth.currentUser.metadata.creationTime;
        this.data.loggedIn = true;
        this.data.cart = Object.assign({}, new Cart());
        userRef.set(Object.assign({}, this.data));
      }
    });
    this.router.navigate(['/profile']);
  }

  async signOut() {
    // Flagging the user's loggedIn field to false
    await this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).update({loggedIn: false});
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
