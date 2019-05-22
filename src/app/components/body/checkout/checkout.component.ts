import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/authentication/auth.service';
import {Observable} from 'rxjs';
import {IUser} from '../../../models/user';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private user$: Observable<IUser>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user$ = this.authService.getCurrentUser();
  }

}
