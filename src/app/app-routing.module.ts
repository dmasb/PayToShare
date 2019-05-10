import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/authentication/auth-guard.service';
import {FeaturesComponent} from './components/body/features/features.component';
import {WeeklydealsComponent} from './components/body/weeklydeals/weeklydeals.component';
import {PricingComponent} from './components/body/pricing/pricing.component';
import {MypageComponent} from './components/body/mypage/mypage.component';
import {RegisterComponent} from './components/body/register/register.component';
import {PasswordrecoveryComponent} from './components/body/passwordrecovery/passwordrecovery.component';
import {Error404Component} from './components/body/error404/error404.component';
import {RoleGuardService} from './services/authentication/role-guard.service';
import {DashboardComponent} from './components/body/admin/dashboard/dashboard.component';
import {SalesComponent} from './components/body/sales/sales.component';




export const routes: Routes = [
  {path: '', redirectTo: '', component: SalesComponent, pathMatch: 'full'},
  {path: 'weeklydeals', component: WeeklydealsComponent},
  {path: 'profile', component: MypageComponent, canActivate: [AuthGuard]},
  {path: 'pricing', component: PricingComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: RegisterComponent},
  {path: 'recover', component: PasswordrecoveryComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuardService]},
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
