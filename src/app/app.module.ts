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
import {PasswordrecoveryComponent} from './components/body/passwordrecovery/passwordrecovery.component';
import {IndexComponent} from './components/body/index/index.component';
import {FooterComponent} from './components/footer/footer.component';
import {AdminBtnComponent} from './components/navbar/admin/admin-btn/admin-btn.component';
import {NgbActiveModal, NgbDatepickerModule, NgbModalModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {AngularFireDatabase} from '@angular/fire/database';
import {QuickAddComponent} from './components/body/admin/quick-add/quick-add.component';
import {ProductManagementComponent} from './components/body/admin/product-management/product-management.component';
import {ItemService} from "./services/item/item.service";
import {Error404Component} from './components/body/error404/error404.component';
import {DecimalPipe} from '@angular/common';
import {OverviewComponent} from './components/body/admin/categorymanagement/overview/overview.component';
import {AddComponent} from './components/body/admin/categorymanagement/add/add.component';
import {DeleteComponent} from './components/body/admin/categorymanagement/delete/delete.component';
import {UpdateComponent} from './components/body/admin/categorymanagement/update/update.component';
import { AddItemsComponent } from './components/body/admin/product-management/add-items/add-items.component';

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
    FooterComponent,
    AdminBtnComponent,
    QuickAddComponent,
    ProductManagementComponent,
    Error404Component,
    OverviewComponent,
    AddComponent,
    DeleteComponent,
    UpdateComponent,
    AddItemsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbDatepickerModule,
    NgbModalModule,
    FontAwesomeModule,
    NgbPaginationModule,
    NgbModule,
  ],
  providers: [AngularFireDatabase, DecimalPipe, NgbActiveModal, ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
}
