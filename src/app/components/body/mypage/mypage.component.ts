import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../models/user";
import {UserSessionService} from '../../../services/user-session.service';
import {FormControl, FormGroup} from "@angular/forms";
import {Userrank} from "../../../models/userrank";

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  userEmail: string;
  currentUser: IUser;

  profile = new FormGroup({
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zipcode: new FormControl(''),
    passconfirm: new FormControl('')
  });

  //const userEmail = this.profile.controls.email.value;

  constructor(private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    // We subscribe to the observable user value changes
    this.userSessionService.currentUser().subscribe(j => this.currentUser = j);
    if(this.currentUser){
      this.profile.controls.email.value.setValue(this.currentUser.email);
    }
  }

  onSubmit(){
    // TODO: UPDATE DB WITH NEW INFO
  }

  isAdmin(): string {
    return this.currentUser.rank == Userrank.Admin ? 'Admin': 'User';
  }
}
