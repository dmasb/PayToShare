import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';

import {IUser} from '../../../models/user';
import {RoleGuardService} from '../../../services/authentication/role-guard.service';
import {Userrank} from '../../../models/userrank';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  userEmail: string;
  user: IUser;


  constructor(private afAuth: AngularFireAuth, private authInfo: AuthGuard, private roleGuard: RoleGuardService) {

    this.userEmail = this.authInfo.getFireBaseUser().email;
    this.roleGuard.getUser().subscribe((val) => {
      this.user = val;
    });
  }

  ngOnInit() {
  }

  isAdmin(): boolean {
    // console.log(this.user.rank);
    return this.user.rank === Userrank.Admin;
  }
}
