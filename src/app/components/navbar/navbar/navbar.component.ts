import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../../services/authentication/login.service';
import {Router} from '@angular/router';
<<<<<<< HEAD
import {AuthGuard} from '../../../services/authentication/auth-guard.service';
import {RoleGuardService} from "../../../services/authentication/role-guard.service";
import {Userrank} from "../../../models/userrank";
=======
import {Userrank} from '../../../models/userrank';
import {AuthService} from '../../../services/authentication/auth.service';
import {Observable} from 'rxjs';
import {IUser} from '../../../models/user';
>>>>>>> developer

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
<<<<<<< HEAD
  isLoggedIn: boolean;

  user: firebase.User;
  _isAdmin: boolean;

=======

  private user$: Observable<IUser>;
  private isAdmin = false;
  private isLoggedIn = false;
  private navBarLoading = false;

>>>>>>> developer
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

<<<<<<< HEAD

  constructor(private authGuard: AuthGuard, private loginService: LoginService, private router: Router, private rg: RoleGuardService) {
=======
  constructor(private auth: AuthService,
              private router: Router) {
    this.user$ = this.auth.getCurrentUser();
>>>>>>> developer
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
