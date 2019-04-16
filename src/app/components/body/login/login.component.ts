import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/authentication/login.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

}
