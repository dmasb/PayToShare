import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';
<<<<<<< HEAD
import {IUser} from '../../../models/user';
import {RoleGuardService} from '../../../services/authentication/role-guard.service';
import {Userrank} from '../../../models/userrank';
import {LoginService} from '../../../services/authentication/login.service';
=======
import {IUser} from "../../../models/user";
import {RoleGuardService} from "../../../services/authentication/role-guard.service";
import {Userrank} from "../../../models/userrank";
import {AngularFireAuth} from "@angular/fire/auth";
>>>>>>> 64502dcaf28f2a2286947725f6741ddd0cc1f756

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  userEmail: string;
  user: IUser;
<<<<<<< HEAD
  userId: string;

  constructor(private authInfo: AuthGuard, private roleGuard: RoleGuardService, private loginService: LoginService) {
=======

  constructor(private afAuth: AngularFireAuth, private authInfo: AuthGuard, private roleGuard: RoleGuardService) {
>>>>>>> 64502dcaf28f2a2286947725f6741ddd0cc1f756
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
