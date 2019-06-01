import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Userrank} from '../../../models/userrank';
import {AuthService} from '../../../services/authentication/auth.service';
import {Observable} from 'rxjs';
import {IUser} from '../../../models/user';
import {MessageService} from '../../../services/message.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private user$: Observable<IUser>;
  private isAdmin = false;
  private isLoggedIn = false;
  private navBarLoading = false;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private auth: AuthService,
              private router: Router,
              private messageService: MessageService) {
    this.user$ = this.auth.getCurrentUser();
  }

  async ngOnInit() {
    // During the time navBarLoading is true, we can easily view spinning objects
    this.navBarLoading = true;
    await this.user$.subscribe(user => {
      if (user) {
        this.isAdmin = user.rank === Userrank.Admin;
        this.isLoggedIn = user.loggedIn;
      }
    });
    this.navBarLoading = false;
  }

  onSubmit() {
    const email = this.profileForm.controls.email.value;
    const password = this.profileForm.controls.password.value;
    this.auth.login(email, password).then(() => {
        this.isLoggedIn = true;
        this.router.navigate(['/profile']);
      }, () => {
        console.log('failed');
      }
    );
  }

  onLogoutClick() {
    this.auth.signOut();
  }

  loginWithGoogle() {
    this.auth.googleLogin();
  }

  loginWithFacebook() {
    this.auth.facebookLogin();
  }
}
