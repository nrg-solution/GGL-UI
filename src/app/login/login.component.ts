import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
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
    loginheader="Member Login";
    loginadmin="Admin Login";
    location: Location;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
            this.model.currentusername='';
            this.model.currentpassword='';

         }

    ngOnInit() {
       // var url = location.pathname;
        //console.log(url);

        this.model.currentusername='';
        this.model.currentpassword='';
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

   
    submitPassword(){
       
       if(this.model.newPassword1 == this.model.newPassword2) {
       // alert("Hi submitPassword caled");
       // this.authenticationService.resetPassword(this.model.currentusername,this.model.newPassword1)
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
       
        // this.loginmenu1 = false;
       // this.loginmenu2 = false;
       // this.loginmenu3 = true;
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
    checkUserName(){
        localStorage.setItem('forgetUser',this.model.currentusername);
        //alert("Test"+this.model.currentusername);
        this.authenticationService.checkUserName(this.model.currentusername)
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

    login() {
   // console.log('Login User name -->',this.model.currentusername);
    //console.log('Login Password -->',this.model.currentpassword);

        this.loading = true;
        this.authenticationService.login(this.model.currentusername, this.model.currentpassword)
            .subscribe(
                data => {
                    this.user=data;
                    console.log("Status ====>", this.user.status); 

        console.log("Value", data);

        if(this.user.status=="success1" && this.user.userRole=="admin") {                    
            localStorage.setItem('currentusername',this.model.currentusername);
            localStorage.setItem('userRole',this.user.userRole);
            localStorage.setItem('memberNumber',this.user.memberNumber);  
            localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);  
            this.router.navigate(['/admin-header']);
        } 

        if(this.user.status=="success" && this.user.userRole=="admin") {                    
                localStorage.setItem('currentusername',this.model.currentusername);
                localStorage.setItem('userRole',this.user.userRole);
                localStorage.setItem('memberNumber',this.user.memberNumber);  
                localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);  
                this.router.navigate(['/dashboard']);
            } 
                    
            if(this.user.status=="success" && this.user.userRole=="member") {                    
                localStorage.setItem('currentusername',this.model.currentusername);
                localStorage.setItem('userRole',this.user.userRole);
                localStorage.setItem('memberNumber',this.user.memberNumber);  
                localStorage.setItem('pageName',"memberhome");
                localStorage.setItem('userloginPrimaryKeyString',this.user.userloginPrimaryKeyString);  
                this.router.navigate(['/memberhome']);

            } 

                        else {
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
