import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../../services/authentication/register.service';
import {IUser} from '../../../models/user';
import {Userrank} from '../../../models/userrank';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordRepeated: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])

  });

  constructor(private registerService: RegisterService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const userEmail = this.profileForm.controls.email.value;
    const pass = this.profileForm.controls.password.value;
    const passConfirm = this.profileForm.controls.passwordRepeated.value;
    const firstname = this.profileForm.controls.firstname.value;
    const lastname = this.profileForm.controls.lastname.value;
    const userPhone = this.profileForm.controls.phone.value;

    const user: IUser = {
      rank: Userrank.User,
      email: userEmail,
      firstName: firstname,
      lastName: lastname,
      loggedIn: false,
      lastLogin: Timestamp.now(),
      phone: userPhone,
    };
    if (pass !== passConfirm) {
      console.warn('NO MATCH');
    } else {
      this.registerService.addUserWithInfo(user, pass);
    }
  }
}
