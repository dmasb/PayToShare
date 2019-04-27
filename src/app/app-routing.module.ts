import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/authentication/auth-guard.service';
import {HomeComponent} from './components/body/home/home.component';
import {FeaturesComponent} from './components/body/features/features.component';
import {WeeklydealsComponent} from './components/body/weeklydeals/weeklydeals.component';
import {PricingComponent} from './components/body/pricing/pricing.component';
import {MypageComponent} from './components/body/mypage/mypage.component';
import {RegisterComponent} from './components/body/register/register.component';
import {LoginComponent} from './components/body/login/login.component';
import {PasswordrecoveryComponent} from './components/body/passwordrecovery/passwordrecovery.component';
import {Error404Component} from './components/body/error404/error404.component';
import {RoleGuardService} from './services/authentication/role-guard.service';
import {PanelComponent} from './components/body/admin/panel/panel.component';
import {ProductsComponent} from './components/body/products/products.component';


export const routes: Routes = [
  {path: '', redirectTo: '', component:HomeComponent, pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'weeklydeals', component: WeeklydealsComponent},
  {path: 'mypage', component: MypageComponent, canActivate: [AuthGuard]},
  {path: 'pricing', component: PricingComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: RegisterComponent},
  {path: 'recover', component: PasswordrecoveryComponent},
  {path: 'adminpanel', component: PanelComponent, canActivate: [AuthGuard]},
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
