import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/authentication/auth-guard.service';
import {FeaturesComponent} from './components/body/features/features.component';
import {WeeklydealsComponent} from './components/body/weeklydeals/weeklydeals.component';
import {MypageOverviewComponent} from './components/body/mypage/mypage-overview/mypage-overview.component';
import {RegisterComponent} from './components/body/register/register.component';
import {PasswordrecoveryComponent} from './components/body/passwordrecovery/passwordrecovery.component';
import {Error404Component} from './components/body/error404/error404.component';
import {RoleGuardService} from './services/authentication/role-guard.service';
import {DashboardComponent} from './components/body/admin/dashboard/dashboard.component';
import {PlanComponent} from './components/body/plan/plan.component';
import {OrderConfirmedComponent} from './components/body/checkout/order-confirmed/order-confirmed.component';
import {FrontPageComponent} from './components/body/front-page/front-page.component';
import {SearchListComponent} from './components/body/search-list/search-list.component';
import {GetkeyComponent} from './components/body/getkey/getkey.component';
import {LicensesComponent} from './components/body/licenses/licenses.component';
import {ProductsComponent} from './components/body/products/products.component';
import {SalesComponent} from './components/body/sales/sales.component';
import {OrderDetailsComponent} from './components/body/mypage/orders/order-details/order-details.component';


export const routes: Routes = [
  {path: '', redirectTo: '', component: FrontPageComponent, pathMatch: 'full'},
  {path: 'collection', component: ProductsComponent},
  {path: 'weeklydeals', component: WeeklydealsComponent},
  {path: 'profile', component: MypageOverviewComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: FeaturesComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'recover', component: PasswordrecoveryComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuardService]},
  {path: 'plan', component: PlanComponent},
  {path: 'licenses', component: LicensesComponent},
  {path: 'order-confirmed', component: OrderConfirmedComponent, canActivate: [AuthGuard]},
  {path: 'search/:searchWord', component: SearchListComponent},
  {path: 'getkey/:hash', component: GetkeyComponent},
  {path: 'sales', component: SalesComponent},
  {path: 'order/:id', component: OrderDetailsComponent},
  {path: '**', component: Error404Component}
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
