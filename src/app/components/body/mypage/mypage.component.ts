import {Component, OnInit} from '@angular/core';
<<<<<<< HEAD
import {AuthGuard} from '../../../services/authentication/auth-guard.service';
import {IUser} from "../../../models/user";
import {RoleGuardService} from "../../../services/authentication/role-guard.service";
import {Userrank} from "../../../models/userrank";
import {AngularFireAuth} from "@angular/fire/auth";
import {FormControl, FormGroup} from "@angular/forms";
=======
import {IUser} from '../../../models/user';
import {UserSessionService} from '../../../services/user-session.service';
>>>>>>> developer

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {

  userEmail: string;
  user: IUser;

<<<<<<< HEAD
  profile = new FormGroup({
    email: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    address: new FormControl(),
    city: new FormControl(),
    country: new FormControl(),
    zipcode: new FormControl(),
    passconfirm: new FormControl()
  });


  constructor(private afAuth: AngularFireAuth, private authInfo: AuthGuard, private roleGuard: RoleGuardService) {
    this.userEmail = this.authInfo.getFireBaseUser().email;
    this.roleGuard.getUser().subscribe((val) => {
      this.user = val;
    })
  }
  ngOnInit() {
  }

  isAdmin(): string {
    return this.user.rank == Userrank.Admin ? 'Admin': 'User';
  }

  onSubmit(){
=======
  constructor(private userSessionService: UserSessionService) {
  }

  ngOnInit() {
    // We subscribe to the observable user value changes
    this.userSessionService.currentUser().subscribe(j => this.currentUser = j);
>>>>>>> developer
  }

}
