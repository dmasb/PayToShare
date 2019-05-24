import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/authentication/auth-guard.service';
import {FeaturesComponent} from './components/body/features/features.component';
import {WeeklydealsComponent} from './components/body/weeklydeals/weeklydeals.component';
import {PricingComponent} from './components/body/pricing/pricing.component';
import {MypageOverviewComponent} from './components/body/mypage/mypage-overview/mypage-overview.component';
import {RegisterComponent} from './components/body/register/register.component';
import {PasswordrecoveryComponent} from './components/body/passwordrecovery/passwordrecovery.component';
import {Error404Component} from './components/body/error404/error404.component';
import {RoleGuardService} from './services/authentication/role-guard.service';
import {DashboardComponent} from './components/body/admin/dashboard/dashboard.component';
import {PlanComponent} from './components/body/plan/plan.component';
import {CollectionComponent} from './components/body/collection/collection.component';
import {CheckoutComponent} from './components/body/checkout/CartOverview/checkout.component';
import {OrderConfirmedComponent} from './components/body/checkout/order-confirmed/order-confirmed.component';
import {FrontPageComponent} from './components/body/front-page/front-page.component';
import {SearchListComponent} from './components/body/search-list/search-list.component';


export const routes: Routes = [
  {path: '', redirectTo: '', component: FrontPageComponent, pathMatch: 'full'},
  {path: 'collection', component: CollectionComponent},
  {path: 'weeklydeals', component: WeeklydealsComponent},
  {path: 'profile', component: MypageOverviewComponent, canActivate: [AuthGuard]},
  {path: 'pricing', component: PricingComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: RegisterComponent},
  {path: 'recover', component: PasswordrecoveryComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuardService]},
  {path: 'plan', component: PlanComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'order-confirmed', component: OrderConfirmedComponent},
  {path: 'search/:searchWord', component: SearchListComponent},
  {path: '**', component: Error404Component},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, RoleGuardService]
})
export class AppRoutingModule {
}
