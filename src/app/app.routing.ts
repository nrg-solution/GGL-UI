import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';

import { JobseekerloginComponent } from './jobseekerlogin/index';
import { JobseekersignupComponent } from './jobseekersignup/index';
import { EmployerloginComponent } from './employerlogin/index';
import { EmployersignupComponent } from './employersignup/index';
import { EmployerhomeComponent } from './employerhome/index';
import { JobseekerhomeComponent } from './jobseekerhome/index';

import { HeaderComponent } from './header/index';
import { EmployerheaderComponent } from './employerheader';
import { JobseekerheaderComponent } from './jobseekerheader';
import { MemberpaymentuploadComponent } from './memberpaymentupload';
import { MemberhomeComponent } from './memberhome';
import { DetailsUploadComponent } from './details-upload';
import { MemberPurchaseunitComponent } from './member-purchaseunit';
import { MemberunitstatusComponent } from './memberunitstatus';
import { MemberWithdrawComponent } from './member-withdraw';
import { MemberMyprofileComponent } from './member-myprofile';
import { MemberNewBookingComponent } from './member-new-booking';
import { MemberViewBookingComponent } from './member-view-booking';
import { MemberMyglgmemberComponent } from './member-myglgmember';
import { MemberPaymentComponent } from './member-payment';
import { AdminHeaderComponent } from './admin-header';
import { InvestmentPaymentuploadComponent } from './investment-paymentupload';

//import { TreeFlatOverviewExampleComponent } from './tree-flat-overview-example';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'home', component: HomeComponent },
    { path: 'jobseekerlogin', component: JobseekerloginComponent },
    { path: 'jobseekersignup', component: JobseekersignupComponent },
    { path: 'employerlogin', component: EmployerloginComponent },
    { path: 'employersignup', component: EmployersignupComponent },
    { path: 'employerhome', component: EmployerhomeComponent },
    { path: 'jobseekerhome', component: JobseekerhomeComponent },
    { path: 'jobseekerheader', component: JobseekerheaderComponent },
    { path: 'employerheader', component: EmployerheaderComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'memberpaymentupload', component: MemberpaymentuploadComponent },
    { path: 'memberhome', component: MemberhomeComponent },
    { path: 'details-upload', component: DetailsUploadComponent },
    { path: 'member-purchaseunit', component: MemberPurchaseunitComponent },
    { path: 'memberunitstatus', component: MemberunitstatusComponent },
    { path: 'member-withdraw', component: MemberWithdrawComponent },
    { path: 'member-myprofile', component: MemberMyprofileComponent },
    { path: 'member-new-booking', component: MemberNewBookingComponent },
    { path: 'member-view-booking', component: MemberViewBookingComponent },
    { path: 'member-myglgmember', component: MemberMyglgmemberComponent },
    { path: 'member-payment', component: MemberPaymentComponent },
    { path: 'admin-header', component: AdminHeaderComponent },
    { path: 'investment-paymentupload', component: InvestmentPaymentuploadComponent },
    
    // { path: 'tree-flat-overview-example', component: TreeFlatOverviewExampleComponent },

  //  { path: 'memberpaymentupload', memberpaymentupload: 'app/lazy/lazy.module#LazyModule' },
   // { path: 'memberhome', loadChildren: 'app/lazy/lazy.module#LazyModule' },


    // otherwise redirect to home
//    { path: '**', redirectTo: '' }
    { path: '**', redirectTo: '/home' }

];

export const routing = RouterModule.forRoot(appRoutes);
