import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/authentication/login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {RecoverpwService} from "../../../services/mail/recoverpw.service";

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.scss']
})
export class PasswordrecoveryComponent implements OnInit {

  constructor(private service: RecoverpwService) { }

  private email: string;

  ngOnInit() {
  }


  async resetPassword(){
    await this.service.resetPassword(this.email);
  }
}
