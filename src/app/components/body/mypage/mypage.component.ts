import {Component, OnInit} from '@angular/core';
import {IUser, User} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  private isAdmin: string;
  private currentUser: User = null;
  private profileUpdated = false;
  private userLoaded = false;

  private profile = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    zipcode: new FormControl(''),
    country: new FormControl('')
  });
  error = false;


  constructor(private fb: FormBuilder, private session: UserSessionService) {
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
    this.currentUser.zipcode = this.profile.controls.zipcode.value;
    this.currentUser.country = this.profile.controls.country.value;
  }

  onSubmit() {
    this.updateFormValues();
    this.session.updateUser(this.currentUser);
    this.profileUpdated = true;
  }

  isAdminString() {
    return this.currentUser.rank === 2 ? 'Admin' : 'User';
  }
}
