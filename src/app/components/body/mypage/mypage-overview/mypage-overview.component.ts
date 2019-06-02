import {Component, OnInit} from '@angular/core';
import {IUser} from '../../../../models/user';
import {UserSessionService} from '../../../../services/user-session.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from '../../../../services/message.service';

@Component({
  selector: 'app-mypage-overview',
  templateUrl: './mypage-overview.component.html',
  styleUrls: ['./mypage-overview.component.scss']
})
export class MypageOverviewComponent implements OnInit {
  isAdmin: string;
  currentUser: IUser = null;
  profileUpdated = false;
  userLoaded = false;
  profile: FormGroup;
  error = false;


  constructor(private fb: FormBuilder,
              private session: UserSessionService,
              private messageService: MessageService) {
    this.profileUpdated = false;
  }

  ngOnInit() {
    this.session.getUserDoc().subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.profile = this.fb.group(user);
        this.userLoaded = true;
      } else {
        this.error = true;
      }
    });

    if (this.currentUser) {
      this.isAdmin = this.isAdminString();
    }
  }

  updateFormValues() {
    this.currentUser.firstName = this.profile.controls.firstName.value;
    this.currentUser.lastName = this.profile.controls.lastName.value;
    this.currentUser.address = this.profile.controls.address.value;
    this.currentUser.city = this.profile.controls.city.value;
    this.currentUser.country = this.profile.controls.country.value;
    this.currentUser.zipcode = this.profile.controls.zipcode.value;
  }

  onSubmit() {
    console.log('xDDDDD');
    this.updateFormValues();
    this.session.updateUser(this.currentUser);
    this.profileUpdated = true;
  }

  isAdminString() {
    return this.currentUser.rank === 2 ? 'Admin' : 'User';
  }
}
