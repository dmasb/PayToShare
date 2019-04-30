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
import {PasswordrecoveryComponent} from './components/body/passwordrecovery/passwordrecovery.component';
import {IndexComponent} from './components/body/index/index.component';
import {FooterComponent} from './components/footer/footer.component';
import {NgbActiveModal, NgbDatepickerModule, NgbModalModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {AngularFireDatabase} from '@angular/fire/database';
import {Error404Component} from './components/body/error404/error404.component';
import {DecimalPipe} from '@angular/common';
import {AddProductComponent} from './components/body/admin/productmanagement/add/add.component';
import {DeleteProductComponent} from './components/body/admin/productmanagement/delete/delete.component';
import {UpdateProductComponent} from './components/body/admin/productmanagement/update/update.component';
import {ProductOverviewComponent} from './components/body/admin/productmanagement/overview/product-overview.component';
import {ProductsComponent} from './components/body/products/products.component';
import {MessageComponent} from './components/body/message/message.component';
import {DashboardComponent} from './components/body/admin/dashboard/dashboard.component';
import {PlanCardComponent} from './components/body/admin/planmanagement/plancard/plan-card.component';
import {PlanBuilderComponent} from './components/body/admin/planmanagement/planbuilder/plan-builder.component';
import {TagOverviewComponent} from './components/body/admin/tagmanagement/tag-overview/tag-overview.component';
import {AddTagComponent} from './components/body/admin/tagmanagement/add-tag/add-tag.component';
import {DeleteTagComponent} from './components/body/admin/tagmanagement/delete-tag/delete-tag.component';
import {UpdateTagComponent} from './components/body/admin/tagmanagement/update-tag/update-tag.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    RegisterComponent,
    HomeComponent,
    PricingComponent,
    FeaturesComponent,
    WeeklydealsComponent,
    MypageComponent,
    PasswordrecoveryComponent,
    IndexComponent,
    FooterComponent,
    Error404Component,
    ProductOverviewComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    AddProductComponent,
    ProductsComponent,
    MessageComponent,
    DashboardComponent,
    PlanCardComponent,
    PlanBuilderComponent,
    TagOverviewComponent,
    AddTagComponent,
    DeleteTagComponent,
    UpdateTagComponent,
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
  providers: [AngularFireDatabase, DecimalPipe, NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
}
