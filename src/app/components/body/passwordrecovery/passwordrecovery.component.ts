import {Component, OnInit} from '@angular/core';
import {RecoverpwService} from '../../../services/mail/recoverpw.service';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.scss']
})
export class PasswordrecoveryComponent implements OnInit {

  constructor(private service: RecoverpwService) {
  }

  private email = '';
  private showError = false;
  private valid: boolean;

  ngOnInit() {
  }

  // Resets error msg when email string is empty.
  emptyEmail(): boolean {
    if (this.email === '') {
      this.showError = false;
    }
    return this.email === '';
  }

  // Requests a password reset from the Recover-service and sets status message.
  async resetPassword() {
    await this.service.resetPassword(this.email).then(() => {
      this.valid = this.service.isValidEmail();
      this.showError = !this.valid;
    });
  }
}
