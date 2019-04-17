import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../services/authentication/login.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.scss']
})
export class PasswordrecoveryComponent implements OnInit {

  constructor(private service: LoginService) { }

  form = new FormGroup({
    email: new FormControl('')
  });

  ngOnInit() {
  }

  onSubmit() {
    let email = this.form.controls.email.value;
    this.resetPassword(email)
  }

  async resetPassword(email: string){
    await this.service.resetPassword(email);
  }
}
