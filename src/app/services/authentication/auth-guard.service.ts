import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(auth => {
      if (!auth) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }));
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getFireBaseUser() {
    return this.afAuth.auth.currentUser;
  }

}
