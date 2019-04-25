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
import {CategoryOverviewComponent} from './components/body/admin/categorymanagement/overview/category-overview.component';
import {ProductOverviewComponent} from './components/body/admin/productmanagement/overview/product-overview.component';


export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'weeklydeals', component: WeeklydealsComponent},
  {path: 'mypage', component: MypageComponent, canActivate: [AuthGuard]},
  {path: 'pricing', component: PricingComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: RegisterComponent},
  {path: 'recover', component: PasswordrecoveryComponent},
  // Admin paths begin here [Needs a better solution, perhaps children?]
  {path: 'productmanagement', component: ProductOverviewComponent},
  {path: 'categorymanagement', component: CategoryOverviewComponent},
  // Admin paths ends here
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
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
