import {Injectable} from '@angular/core';
import {auth, User} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {IUser} from '../../models/user';
import {Userrank} from '../../models/userrank';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

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
  private data = {
    id: null,
    rank: Userrank.User,
    email: null,
    firstName: null,
    lastName: null,
    photoURL: null,
    registerDate: null,
    sex: null,
    address: 'N/A',
    city: 'N/A',
    phone: null,
    loggedIn: false,
    lastLogin: null,
    sessionID: null,
  };
  private user$: Observable<IUser>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
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

  // Temporary method
  getCurrentUser(): Observable<IUser> {
    return this.user$;
  }

  state(): Observable<User> {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return new Promise(() => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(async () => {
          await this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).update(
            {
              lastLogin: firebase.firestore.Timestamp.fromDate(new Date()),
              loggedIn: true
            }
          );
          this.router.navigate(['/mypage']);
        }, () => {
          console.warn('Wrong email or password');
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

  addUserWithInfo(user: IUser, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, password).then(async cred => {
      this.afAuth.auth.currentUser.sendEmailVerification();
      const credential = await this.afAuth.auth;

      // Adding required information to the user document data set mentioned earlier.
      this.data.id = credential.currentUser.uid;
      this.data.email = credential.currentUser.email;
      this.data.firstName = user.firstName;
      this.data.lastName = user.lastName;
      this.data.lastLogin = firebase.firestore.Timestamp.fromDate(new Date());
      this.data.registerDate = cred.user.metadata.creationTime;

      this.router.navigate(['/mypage']);
      return this.afs.collection('users').doc(cred.user.uid).set(this.data);
    });
  }

  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);
    const displayName = user.displayName.split(' ', 2);

    // Adding required information to the user document data set mentioned earlier.
    this.data.id = user.uid;
    this.data.email = user.email;
    this.data.firstName = displayName[0];
    (displayName[1]) ? this.data.lastName = displayName[1] : this.data.lastName = '';
    this.data.photoURL = user.photoURL;
    this.data.lastLogin = firebase.firestore.Timestamp.fromDate(new Date());
    this.data.registerDate = this.afAuth.auth.currentUser.metadata.creationTime;
    this.data.loggedIn = true;
    userRef.set(this.data, {merge: true});
    this.router.navigate(['/mypage']);

  }

  async signOut() {
    // Flagging the user's loggedIn field to false
    await this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`).update({loggedIn: false});
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
