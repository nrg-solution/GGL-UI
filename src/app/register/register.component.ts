import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models';

import { AlertService, UserService } from '../_services';

@Component({ 
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']

})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
    user:User;

    registersuccessdialog = 'none';
    userExsistdialog = 'none';
    memberIDNotValiddialog = 'none';
    otherErrordialog = 'none';

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  
    // OnInit calling
    countryList: any = {};
    ngOnInit() {
              
        this.userService.getCountry()
        .subscribe(
            data => {
                this.countryList = data;
            },
            error => {
                alert('Error !!!!');
            }
        );
  
    }
  
    getMemberIDValidate() {
    
        this.userService.getMemberIDValidate(this.model.refmemberID)
            .subscribe(
                memberResponse => {
                    this.user = memberResponse;
                    //  console.log("Response message -------------------->", this.user.status); 
                    if(this.user.status=="Valid")
                    {
                        this.alertService.success('Member ID is available.');
                    } 
                    
                    if(this.user.status=="InValid")
                    {
                        this.alertService.success('Member ID is not Valid.');
                    }                  
                },
              
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });          
        //this.alertService.success('Member ID is available.', true); 
        //this.alertService.success('Please enter valid Member ID.', true);
    }
  
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                   this.user=data;
                    console.log('return value -->',this.user.status);

                    if(this.user.status=="userexits") {
                        console.log('If User Exits');
                        this.userExsistdialog = 'block';
                        this.loading = false;
                    }

                    if(this.user.status=="success") {
                        console.log('If Success');
                        this.registersuccessdialog = 'block';
                        // this.loading = true;
                    }

                    if(this.user.status=="otherError") {
                        console.log('If Other Error');
                        this.otherErrordialog = 'block';
                        this.loading = false;

                    }
                    if(this.user.status=="memberIDNotValid") {
                        this.memberIDNotValiddialog = 'block';
                        this.loading = false;
                    }     
                  
                },
                error => {
                    this.otherErrordialog = 'block';
                    this.loading = false;
                });
    }

    onCloseHandled(){
        this.userExsistdialog = 'none';
        this.memberIDNotValiddialog = 'none';
        this.otherErrordialog = 'none';
    }

    onCloseHandled2(){
        this.registersuccessdialog='none'; 
        this.router.navigate(['/login']);
    }
}
