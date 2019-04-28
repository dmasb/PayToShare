import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Userrank} from '../../../models/userrank';
import {AuthService} from '../../../services/authentication/auth.service';

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

  constructor(private auth: AuthService) {
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

    const user = {
      rank: Userrank.User,
      email: userEmail,
      firstName: firstname,
      lastName: lastname,
      phone: userPhone
    };


    if (pass !== passConfirm) {
      console.warn('NO MATCH');
    } else {
      this.auth.addUserWithInfo(user, pass);
    }
  }
}
