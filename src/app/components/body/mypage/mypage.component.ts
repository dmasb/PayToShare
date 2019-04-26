import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';
import {IUser} from '../../../models/user';
import {RoleGuardService} from '../../../services/authentication/role-guard.service';
import {Userrank} from '../../../models/userrank';
import {LoginService} from '../../../services/authentication/login.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  userEmail: string;
  user: IUser;
  userId: string;

  constructor(private authInfo: AuthGuard, private roleGuard: RoleGuardService, private loginService: LoginService) {
    this.userEmail = this.authInfo.getFireBaseUser().email;
    this.roleGuard.getUser().subscribe((val) => {
      this.user = val;
    });
    this.userId = this.loginService.uid;
  }

  ngOnInit() {
    console.log(this.userId);
  }

  isAdmin(): boolean {
    // console.log(this.user.rank);
    return this.user.rank === Userrank.Admin;
  }
}
