import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';
import {User} from "../../../models/user";

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  userEmail: string;
  user: User;

  constructor(private authInfo: AuthGuard) {
    this.userEmail = this.authInfo.getFireBaseUser().email;
    //this.user = this.authInfo.getFireBaseUser();

  }

  ngOnInit() {
  }

}
