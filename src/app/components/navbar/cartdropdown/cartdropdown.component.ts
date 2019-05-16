import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';

@Component({
  selector: 'app-cartdropdown',
  templateUrl: './cartdropdown.component.html',
  styleUrls: ['./cartdropdown.component.scss']
})
export class CartdropdownComponent implements OnInit {

  private user: User;

  constructor(private userSession: UserSessionService) {
  }

  ngOnInit() {
    this.userSession.getUserDoc().subscribe(user => this.user = user);
  }
}
