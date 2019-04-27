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

  constructor(private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    this.userSessionService.currentUser().subscribe(j => this.currentUser = j);
  }

}
