import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserSessionService} from '../user-session.service';
import {CanActivate, Router} from '@angular/router';
import {Userrank} from '../../models/userrank';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  // Inject dependencies
  constructor(private userSessionService: UserSessionService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);
    console.log(' === ' + Userrank.Admin);

    return this.userSessionService.currentUser().pipe(map(user => {
      console.log(user.rank + ' === ' + Userrank.Admin);
      console.log(user.rank + ' === ' + Userrank.Admin);
      console.log(user.rank + ' === ' + Userrank.Admin);
      console.log(user.rank + ' === ' + Userrank.Admin);
      console.log(user.rank + ' === ' + Userrank.Admin);
      console.log(user.rank + ' === ' + Userrank.Admin);
      console.log(user.rank + ' === ' + Userrank.Admin);
      console.log(user.rank + ' === ' + Userrank.Admin);
      return user.rank === Userrank.Admin;
    })) as Observable<boolean>;
  }

}
