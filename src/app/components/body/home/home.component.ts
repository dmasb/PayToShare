import {Component, OnInit} from '@angular/core';
import {IUser, User} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private currentUser: IUser;
  private loading: boolean;

  constructor(private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    if (this.userSessionService.currentUser()) {
      this.userSessionService.currentUser().subscribe(j => this.currentUser = j);
    }
  }
}
