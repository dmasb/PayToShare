import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {NavbarComponent} from './components/navbar/navbar/navbar.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/body/home/home.component';
import {FeaturesComponent} from './components/body/features/features.component';
import {WeeklydealsComponent} from './components/body/weeklydeals/weeklydeals.component';
import {PricingComponent} from './components/body/pricing/pricing.component';
import {MypageComponent} from './components/body/mypage/mypage.component';
import {RegisterComponent} from './components/body/register/register.component';
import {LoginComponent} from './components/body/login/login.component';
import { PasswordrecoveryComponent } from './components/body/passwordrecovery/passwordrecovery.component';
import { IndexComponent } from './components/body/index/index.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PricingComponent,
    FeaturesComponent,
    WeeklydealsComponent,
    MypageComponent,
    PasswordrecoveryComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
