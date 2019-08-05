import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { AlertService, AuthenticationService, JobSeekerService } from '../_services/index';

@Component({
  selector: 'app-jobseekerlogin',
  templateUrl: './jobseekerlogin.component.html',
  styleUrls: ['./jobseekerlogin.component.css']
})
export class JobseekerloginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
 // status: any;
  temp:string;
  user:User;
  public loginmenu1 = true;
  public loginmenu2 = false;
  public loginmenu3 = false;
  public loginmenu4 = false;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private jobseekerService: JobSeekerService,
    private alertService: AlertService) {
      this.model.currentusername='';
      this.model.currentpassword='';
     }

  ngOnInit() {

    this.model.currentusername='';
    this.model.currentpassword='';
   // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  forgetCancel()
  {
     // alert("forget cancel called.");
    //  this.router.navigate(['/login']);
      this.loginmenu1 = true;
      this.loginmenu2 = false;
      this.loginmenu3 = false;
      this.loginmenu4 = false;
      this.model.currentusername='';
      this.model.currentpassword='';

  }

  forgetPassword(){
      this.loginmenu1 = false;
      this.loginmenu2 = true;
      this.loginmenu3 = false;
      this.loginmenu4 = false;
      this.model.currentusername='';
      this.model.currentpassword='';
  }

 
  submitPassword(){
     
     if(this.model.newPassword1 == this.model.newPassword2) {
      this.authenticationService.resetPassword(this.model.newPassword1,localStorage.getItem('forgetUser'))
      .subscribe(
      data => {
      this.user=data;
      if(this.user.status=='success') 
      {
      this.loginmenu1 = true;
      this.loginmenu2 = false;
      this.loginmenu3 = false;
      this.loginmenu4 = false;
      this.model.currentusername='';
      this.model.currentpassword='';
      this.alertService.success('New Password is updated successfully.');
      }
      if(this.user.status=='failure') 
      {
          this.alertService.success('Please enter valid OTP');

      }


  },
  error => {
          this.alertService.success('Network error.');
  });

     // this.alertService.success('Pass matches');

     }
     else {
      this.alertService.success('Pass word is mismatch please try again');

     }
  }
 
  OTPCheck(){
      this.authenticationService.OTPCheck(this.model.otp)
              .subscribe(
          data => {

              this.user=data;
              if(this.user.status=='success') 
              {
                  this.loginmenu1 = false;
                  this.loginmenu2 = false;
                  this.loginmenu3 = false;
                  this.loginmenu4 = true;
                  this.model.newPassword1='';
                  this.model.newPassword1='';
              }
              if(this.user.status=='failure') 
              {
                  this.alertService.success('Please enter valid OTP');

              }


          },
          error => {
  this.alertService.success('Network error.');
          });

  }
  validateJobSeekerUserName(){
      localStorage.setItem('forgetUser',this.model.currentusername);
      if(this.model.currentusername=='') {
        this.alertService.error('Please enter User Name.');

      }
      else {
        this.jobseekerService.validateJobSeekerUserName(this.model.currentusername)
        .subscribe(
    data => {
        this.user=data;
        if(this.user.status=='success') {
            this.loginmenu1 = false;
            this.loginmenu2 = false;
            this.loginmenu3 = true;
            this.loginmenu4 = false;
           
        }
        
        if(this.user.status=='failure') {
            this.alertService.success('Invalid Email ID');
            this.loginmenu1 = false;
            this.loginmenu2 = true;
            this.loginmenu3 = false;
            this.loginmenu4 = false;


        }



    }, 
    error => {
        this.alertService.error('Network error.');
    });
      }

    //  this.alertService.success('User name is valid');
      this.model.currentusername='';
      this.model.otp='';

  }

  getJobSeekersLogin() {
      this.loading = true;
       this.jobseekerService.getJobSeekersLogin(this.model.currentusername, this.model.currentpassword)
          .subscribe(
              data => {
               this.user=data;
              console.log("Value", data);
             if(this.user.status=="success") {
                  
            localStorage.setItem('currentusername',this.model.currentusername);
            localStorage.setItem('userRole',this.user.userRole);
            localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString); 
            this.router.navigate(['/jobseekerhome']);

             } else {
                this.loading = false;
                this.alertService.error(this.user.status);
             }

              },
              error => {
                //console.log('Login page Network issue');
                  this.alertService.error('Due to some Technical issue. Please try later');
                  this.loading = false;
              });
  }
  
}
