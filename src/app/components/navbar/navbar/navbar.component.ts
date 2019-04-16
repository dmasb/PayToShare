import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../../services/authentication/login.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../../services/authentication/auth-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;

  user: firebase.User;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authGuard: AuthGuard, private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.authGuard.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.loginService.getLoggedInGoogleUser().subscribe( user => {
      this.user = user;
    })

    this.loginService.getLoggedInFacebookUser().subscribe( user => {
      console.log( user );
      this.user = user;
    })

  }

  onSubmit() {
    const email = this.profileForm.controls.email.value;
    const password = this.profileForm.controls.password.value;
    console.log(email);
    console.log(password);
    this.loginService.login(email, password).then(loggedIn => {
        this.isLoggedIn = true;
        this.router.navigate(['/mypage']);
      }
    );
  }

  onLogoutClick() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  glogin() {
    this.loginService.loginGoogle();
  }

  fblogin(){
    this.loginService.loginFacebook();
    
  }

  
}
