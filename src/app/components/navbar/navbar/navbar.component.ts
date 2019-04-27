import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../../services/authentication/login.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';
import {UserSessionService} from '../../../services/user-session.service';
import {Userrank} from '../../../models/userrank';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private loginService: LoginService,
              private router: Router,
              private authGuard: AuthGuard,
              private userSessionService: UserSessionService) {
  }

  ngOnInit() {

    this.authGuard.getAuth().subscribe(auth => {
      this.isLoggedIn = !!auth;
    });
    // Wait for the user document to be fetched before accessing data.
    if (this.userSessionService.currentUser()) {
      this.userSessionService.currentUser().subscribe(res => {
        this.isAdmin = (res.rank === Userrank.Admin);
      });
    }
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

  loginWithGoogle() {
    this.loginService.loginGoogle();
  }

  loginWithFacebook() {
    this.loginService.loginFacebook();
  }
}
