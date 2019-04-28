import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  private currentUser: IUser;
  constructor(private userSessionService: UserSessionService) {}

  ngOnInit() {
    // We subscribe to the observable user value changes
    this.userSessionService.currentUser().subscribe(j => this.currentUser = j);
  }
}
