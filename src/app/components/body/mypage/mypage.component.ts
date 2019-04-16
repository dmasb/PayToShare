import {Component, OnInit} from '@angular/core';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  userEmail: string;

  constructor(private authInfo: AuthGuard) {
    this.userEmail = this.authInfo.getUser().email;

  }

  ngOnInit() {
  }

}
