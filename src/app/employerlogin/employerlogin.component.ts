import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models';
import { AlertService, EmployerService } from '../_services';

@Component({
  selector: 'app-employerlogin',
  templateUrl: './employerlogin.component.html',
  styleUrls: ['./employerlogin.component.css']
})
export class EmployerloginComponent implements OnInit {

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
  constructor(private route: ActivatedRoute,
    private router: Router,
    private employerService: EmployerService,
    private alertService: AlertService) {

      this.model.currentusername='';
      this.model.currentpassword='';
     }

  ngOnInit() {
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
    //  this.alertService.success();

      //alert("Forget password called.");
      this.loginmenu1 = false;
      this.loginmenu2 = true;
      this.loginmenu3 = false;
      this.loginmenu4 = false;

      this.model.currentusername='';
      this.model.currentpassword='';
  }

 
  checkUserName(){
      localStorage.setItem('forgetUser',this.model.currentusername);
      //alert("Test"+this.model.currentusername);
      this.employerService.validateEmployerUserName(this.model.currentusername)
              .subscribe(
          data => {
              this.user=data;
              if(this.user.status=='success') {
                 // this.alertService.success('User name is valid Please enter OTP');
                  this.loginmenu1 = false;
                  this.loginmenu2 = false;
                  this.loginmenu3 = true;
                  this.loginmenu4 = false;
                 
              }
              
              if(this.user.status=='failure') {
                  this.alertService.success('User name is not valid');
                  this.loginmenu1 = false;
                  this.loginmenu2 = true;
                  this.loginmenu3 = false;
                  this.loginmenu4 = false;


              }



          }, 
          error => {
              this.alertService.success('Network error.');
          });
    //  this.alertService.success('User name is valid');
      this.model.currentusername='';
      this.model.otp='';

  }

  loginEmployer() {
  //console.log('Login User name -->',this.model.currentusername);
  //console.log('Login Password -->',this.model.currentpassword);

      this.loading = true;
       this.employerService.getEmployerLogin(this.model.currentusername, this.model.currentpassword)
          .subscribe(
              data => {
               this.user=data;
                console.log("Status --->", this.user.status); 

              console.log("Value", data);
             if(this.user.status=="success") {
                  
            localStorage.setItem('currentusername',this.model.currentusername);
            localStorage.setItem('userRole',this.user.userRole);
            localStorage.setItem('memberNumber',this.user.memberNumber);  
            localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);  

              this.router.navigate(['/employerhome']);

             } else {
                this.loading = false;
                this.alertService.error(this.user.status);
             }

              },
              error => {
                console.log('Login page Network issue');
                  this.alertService.error('Due to some Technical issue. Please try later');
                  this.loading = false;
              });
  }
}
