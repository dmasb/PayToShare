import {Component, OnInit, Input} from '@angular/core';
import {ProcessorderService} from '../../../../services/mail/processorder.service';
import {LicenseSubscription, PlanSubscription} from '../../../../models/subscription';
import {UserSessionService} from '../../../../services/user-session.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss']
})
export class MySubscriptionsComponent implements OnInit {

  @Input() private uid: string;
  private licenseSubscriptions: LicenseSubscription[];
  private planSubscription: PlanSubscription[];

  constructor(private auth: UserSessionService,
              private orderService: ProcessorderService) {
  }

  ngOnInit() {
    this.orderService.getLicenseSubscriptions(this.uid).subscribe(subs => this.licenseSubscriptions = subs);
    this.orderService.getPlanSubscription(this.uid).subscribe(sub => (sub.length > 0) ? this.planSubscription = sub : null);
  }

  cancelPlan(sub: PlanSubscription) {
    this.orderService.cancelPlan(sub);
    this.planSubscription = null;
  }

  cancelLicense(sub: LicenseSubscription) {
    this.orderService.cancelLicense(sub);
  }
}
