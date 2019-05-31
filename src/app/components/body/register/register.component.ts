import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Userrank} from '../../../models/userrank';
import {AuthService} from '../../../services/authentication/auth.service';
import {MessageService} from '../../../services/message.service';
import {alerts} from '../../../models/alerts';
import {User} from '../../../models/user';

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

  constructor(private auth: AuthService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.auth.googleLogin();
  }

  loginWithFacebook() {
    this.auth.facebookLogin();
  }

  onSubmit() {
    const userEmail = this.profileForm.controls.email.value;
    const pass = this.profileForm.controls.password.value;
    const passConfirm = this.profileForm.controls.passwordRepeated.value;
    const firstname = this.profileForm.controls.firstname.value;
    const lastname = this.profileForm.controls.lastname.value;
    const userPhone = this.profileForm.controls.phone.value;

    const user = new User();
    user.email = userEmail;
    user.firstName = firstname;
    user.lastName = lastname;
    user.phone = userPhone;


    if (pass !== passConfirm) {
      this.messageService.add('Passwords must match!', alerts.danger);
    } else if (!user.firstName) {
      this.messageService.add('First name is required!', alerts.danger);
    } else if (!user.lastName) {
      this.messageService.add('Last name is required!', alerts.danger);
    } else {
      this.auth.addUserWithInfo(user, pass);
    }
  }
}
