import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertService, AuthenticationService, UserService, JobSeekerService,EmployerService,ServerURL } from './_services/index';
import { AlertComponent } from './_directives/index';
import { fakeBackendProvider } from './_helpers/index';
import { JwtInterceptor } from './_helpers/index';
import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/index';
import { HomeComponent } from './home/index';
import { JobseekerloginComponent } from './jobseekerlogin/index';
import { JobseekersignupComponent } from './jobseekersignup/index';
import { EmployerloginComponent } from './employerlogin/index';
import { EmployersignupComponent } from './employersignup/index';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { EmployerhomeComponent } from './employerhome/index';
import { JobseekerhomeComponent } from './jobseekerhome/index';
import { EmployerheaderComponent } from './employerheader/index';
import { JobseekerheaderComponent } from './jobseekerheader/index';
import { MemberpaymentuploadComponent } from './memberpaymentupload/index';
import { MemberhomeComponent } from './memberhome/index';
import { MemberheaderComponent } from './memberheader/index';
import { DetailsUploadComponent } from './details-upload/index';
import { MemberPurchaseunitComponent } from './member-purchaseunit/index';
import { MemberunitstatusComponent } from './memberunitstatus/index';
import { MemberWithdrawComponent } from './member-withdraw/index';
import { MemberMyprofileComponent } from './member-myprofile/index';
import { MemberNewBookingComponent } from './member-new-booking/member-new-booking.component';
import { MemberViewBookingComponent } from './member-view-booking/member-view-booking.component';
import { MemberMyglgmemberComponent } from './member-myglgmember/member-myglgmember.component';
import { MemberPaymentComponent } from './member-payment/index';
import { AdminHeaderComponent } from './admin-header/index';
import { InvestmentPaymentuploadComponent } from './investment-paymentupload/index';

//import { TreeFlatOverviewExampleComponent } from './tree-flat-overview-example/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        HomeComponent,
        JobseekerloginComponent,
        JobseekersignupComponent,
        EmployerloginComponent,
        EmployersignupComponent,
        HeaderComponent,
        FooterComponent,
        EmployerhomeComponent,
        JobseekerhomeComponent,
        EmployerheaderComponent,
        JobseekerheaderComponent,
        MemberpaymentuploadComponent,
        MemberhomeComponent,
        MemberheaderComponent,
        DetailsUploadComponent,
        MemberPurchaseunitComponent,
        MemberunitstatusComponent,
        MemberWithdrawComponent,
        MemberMyprofileComponent,
        MemberNewBookingComponent,
        MemberViewBookingComponent,
        MemberMyglgmemberComponent,
        MemberPaymentComponent,
        AdminHeaderComponent,
        InvestmentPaymentuploadComponent,
        //  TreeFlatOverviewExampleComponent,
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        JobSeekerService,
        EmployerService,
        ServerURL,

        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
