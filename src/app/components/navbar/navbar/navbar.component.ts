import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../../services/authentication/login.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';
import {RoleGuardService} from "../../../services/authentication/role-guard.service";
import {Userrank} from "../../../models/userrank";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  user: firebase.User;
  _isAdmin: boolean;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  constructor(private authGuard: AuthGuard, private loginService: LoginService, private router: Router, private rg: RoleGuardService) {
  }

  ngOnInit() {
    this.authGuard.getAuth().subscribe(auth => {
      this.isLoggedIn = !!auth;
    });

    this.loginService.getLoggedInGoogleUser().subscribe(user => {
      this.user = user;
    });

    this.loginService.getLoggedInFacebookUser().subscribe(user => {
      this.user = user;
    });

  }

  onSubmit() {
    const email = this.profileForm.controls.email.value;
    const password = this.profileForm.controls.password.value;
    this.loginService.login(email, password).then(() => {
        this.isLoggedIn = true;
        this.router.navigate(['/mypage']);
      }, () => {
        console.log('failed');
      }
    );
  }

  isAdmin(): boolean {
    let result;
    this.rg.getUser().subscribe((user) => {
      if (user) {
        this._isAdmin = user.rank == Userrank.Admin
      }
    });
    return this._isAdmin;
  }

  onLogoutClick() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  glogin() {
    let promise = this.loginService.loginGoogle();
  }

  fblogin() {
    this.loginService.loginFacebook();
  }
}
