import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {Userrank} from '../../models/userrank';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  // Inject dependencies
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(map(user => {
      if (user && user.rank === Userrank.Admin) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }));
  }
}
