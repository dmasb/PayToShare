import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../../services/authentication/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordRepeated: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private registerService: RegisterService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const email = this.profileForm.controls.email.value;
    const pass = this.profileForm.controls.password.value;
    const passConfirm = this.profileForm.controls.passwordRepeated.value;

    if (pass !== passConfirm) {
      console.warn('NO MATCH');
    } else {
      this.registerService.addUser(email, pass);
    }
  }

}
