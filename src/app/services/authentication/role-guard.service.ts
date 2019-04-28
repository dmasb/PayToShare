import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {IUser} from '../../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  user: Observable<IUser>;

  // Inject dependencies
  constructor(private auth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
  }

  // Get user from Database
  getUser() {
    try {
      this.user = this.afs.collection('users').doc<IUser>(this.auth.auth.currentUser.uid).valueChanges();
      return this.user;
    } catch (err) {
      console.log('Could not fetch user.' + err.toString());
    }
  }
}
