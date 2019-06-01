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
import {FeaturesComponent} from './components/body/features/features.component';
import {WeeklydealsComponent} from './components/body/weeklydeals/weeklydeals.component';
import {MypageComponent} from './components/body/mypage/mypage.component';
import {RegisterComponent} from './components/body/register/register.component';
import {PasswordrecoveryComponent} from './components/body/passwordrecovery/passwordrecovery.component';
import {FooterComponent} from './components/footer/footer.component';
import {NgbActiveModal, NgbDatepickerModule, NgbModalModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {AngularFireDatabase} from '@angular/fire/database';
import {Error404Component} from './components/body/error404/error404.component';
import {DecimalPipe} from '@angular/common';
import {ProductsComponent} from './components/body/products/products.component';
import {MessageComponent} from './components/body/message/message.component';
import {DashboardComponent} from './components/body/admin/dashboard/dashboard.component';
import {PlanCardComponent} from './components/body/admin/planmanagement/plancard/plan-card.component';
import {PlanBuilderComponent} from './components/body/admin/planmanagement/planbuilder/plan-builder.component';
import {TagOverviewComponent} from './components/body/admin/tagmanagement/tag-overview/tag-overview.component';
import {AddTagComponent} from './components/body/admin/tagmanagement/add-tag/add-tag.component';
import {DeleteTagComponent} from './components/body/admin/tagmanagement/delete-tag/delete-tag.component';
import {UpdateTagComponent} from './components/body/admin/tagmanagement/update-tag/update-tag.component';
import {AddProductComponent} from './components/body/admin/productmanagement/add-product/add-product.component';
import {UpdateProductComponent} from './components/body/admin/productmanagement/update-product/update-product.component';
import {DeleteProductComponent} from './components/body/admin/productmanagement/delete-product/delete-product.component';
import {ProductOverviewComponent} from './components/body/admin/productmanagement/product-overview/product-overview.component';
import {AddFormatComponent} from './components/body/admin/formatmanagement/add-format/add-format.component';
import {FormatOverviewComponent} from './components/body/admin/formatmanagement/format-overview/format-overview.component';
import {UpdateFormatComponent} from './components/body/admin/formatmanagement/update-format/update-format.component';
import {DeleteFormatComponent} from './components/body/admin/formatmanagement/delete-format/delete-format.component';
import {AddLicenseComponent} from './components/body/admin/licensemanagement/add-license/add-license.component';
import {DeleteLicenseComponent} from './components/body/admin/licensemanagement/delete-license/delete-license.component';
import {UpdateLicenseComponent} from './components/body/admin/licensemanagement/update-license/update-license.component';
import {LicenseOverviewComponent} from './components/body/admin/licensemanagement/license-overview/license-overview.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {PlanOverviewComponent} from './components/body/admin/planmanagement/plan-overview/plan-overview.component';
import {DeletePlanComponent} from './components/body/admin/planmanagement/delete-plan/delete-plan.component';
import {ImageUploadTemplateComponent} from './components/body/admin/image-upload-template/image-upload-template.component';
import {SalesComponent} from './components/body/sales/sales.component';
import {AddTagSaleComponent} from './components/body/admin/salemanegement/add-tag-sale/add-tag-sale.component';
import {AddPlanSaleComponent} from './components/body/admin/salemanegement/add-plan-sale/add-plan-sale.component';
import {SaleOverviewComponent} from './components/body/admin/salemanegement/sale-overview/sale-overview.component';
import {DeleteSaleComponent} from './components/body/admin/salemanegement/delete-sale/delete-sale.component';
import {PlanComponent} from './components/body/plan/plan.component';
import {CartdropdownComponent} from './components/navbar/cartdropdown/cartdropdown.component';
import {StarReviewComponent} from './components/body/products/star-review/star-review.component';
import {CheckoutComponent} from './components/body/checkout/CartOverview/checkout.component';
import {MypageOverviewComponent} from './components/body/mypage/mypage-overview/mypage-overview.component';
import {MypageSettingsComponent} from './components/body/mypage/settings/mypage-settings/mypage-settings.component';
import {MypageOrdersComponent} from './components/body/mypage/orders/mypage-orders/mypage-orders.component';
import {MypageMycartComponent} from './components/body/mypage/mycart/mypage-mycart/mypage-mycart.component';
import {OrderConfirmedComponent} from './components/body/checkout/order-confirmed/order-confirmed.component';
import {LicensesComponent} from './components/body/licenses/licenses.component';
import {FrontPageComponent} from './components/body/front-page/front-page.component';
import {AddLicenseSaleComponent} from './components/body/admin/salemanegement/add-license-sale/add-license-sale.component';
import {SearchbarComponent} from './components/navbar/searchbar/searchbar.component';
import {SearchListComponent} from './components/body/search-list/search-list.component';
import {MySubscriptionsComponent} from './components/body/mypage/my-subscriptions/my-subscriptions.component';
import {CookieService} from 'ngx-cookie-service';
import {GetkeyComponent} from './components/body/getkey/getkey.component';
import {ViewIncludedProductsComponent} from './components/body/view-included-products/view-included-products.component';
import {OrderDetailsComponent } from './components/body/mypage/orders/order-details/order-details.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    RegisterComponent,
    FeaturesComponent,
    WeeklydealsComponent,
    MypageComponent,
    PasswordrecoveryComponent,
    FooterComponent,
    Error404Component,
    ProductsComponent,
    MessageComponent,
    DashboardComponent,
    PlanCardComponent,
    PlanBuilderComponent,
    TagOverviewComponent,
    AddTagComponent,
    DeleteTagComponent,
    UpdateTagComponent,
    AddProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    ProductOverviewComponent,
    AddFormatComponent,
    FormatOverviewComponent,
    UpdateFormatComponent,
    DeleteFormatComponent,
    AddLicenseComponent,
    DeleteLicenseComponent,
    UpdateLicenseComponent,
    LicenseOverviewComponent,
    PlanOverviewComponent,
    DeletePlanComponent,
    ImageUploadTemplateComponent,
    SalesComponent,
    AddTagSaleComponent,
    AddPlanSaleComponent,
    SaleOverviewComponent,
    DeleteSaleComponent,
    PlanComponent,
    CartdropdownComponent,
    StarReviewComponent,
    CheckoutComponent,
    MypageOverviewComponent,
    MypageSettingsComponent,
    MypageOrdersComponent,
    MypageMycartComponent,
    OrderConfirmedComponent,
    LicensesComponent,
    FrontPageComponent,
    AddLicenseSaleComponent,
    SearchbarComponent,
    SearchListComponent,
    MySubscriptionsComponent,
    GetkeyComponent,
    ViewIncludedProductsComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbDatepickerModule,
    NgbModalModule,
    FontAwesomeModule,
    NgbPaginationModule,
    NgbModule,

  ],
  providers: [AngularFireDatabase, DecimalPipe, NgbActiveModal, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
}
