//import { Component, OnInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Job } from '../_models';
import { AlertService, UserService, JobSeekerService } from '../_services';
import { Router } from '@angular/router';
//import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-jobseekersignup',
  templateUrl: './jobseekersignup.component.html',
  styleUrls: ['./jobseekersignup.component.css']
})
export class JobseekersignupComponent implements OnInit {

  model: any = {};
  loading = false;
  jobseeker:Job;
  countryList: any = {};
  industryList: any = {};

  loadinggif:boolean = false;

  //@ViewChild("jobseekerSignUpForm")
   // yourForm: NgForm;
   public jobseekerSignUpdiv = false;
    
  constructor(
    private router: Router,
     private userService: UserService,
     private jobseekerService: JobSeekerService,
     private alertService: AlertService) { }

  ngOnInit() {
   // this.industryList={'Alex':'John'};
    this.jobseekerSignUpdiv = true;   
    this.jobseekerService.getIndustry()
    .subscribe(
     data => {
      this.industryList = data;
   },
       error => {
        this.alertService.error('Some NetWork Issue ');
      }
   );

    this.userService.getCountry()
    .subscribe(
     data => {
      this.countryList = data;
   },
       error => {
        this.alertService.error('Some NetWork Issue ');
      }
   );
  }

  

 
  resgisterJobSeeker(){
    this.jobseekerSignUpdiv = false;
    this.loadinggif=true;
    this.jobseekerService.resgisterJobSeeker(this.model)
        .subscribe(
            data => {
                this.jobseeker=data;
                console.log("Status ----->"+this.jobseeker.status);    
                if(this.jobseeker.status=="userexits"){
                  this.loadinggif=false;
                  this.alertService.error('Your User ID Already Exist. Please try with Another User ID');
                  this.jobseekerSignUpdiv = true;
                }

                if(this.jobseeker.status=="InvalidEmailID"){
                  this.loadinggif=false;
                  this.alertService.error('Your User ID / Email ID is not valid. Please try again');
                  this.model.emailID='';
                  this.jobseekerSignUpdiv = true;
                }

                if(this.jobseeker.status=="success"){
                this.alertService.success('Registration successfully completed.');
                   this.loadinggif=false;
                   this.model.name='';
                   this.model.emailID='';
                   this.model.country='';
                   this.model.phoneNumber='';
                   this.model.address='';
                   this.model.qualification='';
                   this.model.industry='';
                   this.model.password='';
                   this.jobseekerSignUpdiv = true;

                }

                if(this.jobseeker.status=="emailIDExists") {
                  this.loadinggif=false;
                  this.alertService.error('Your Email ID Already Exist. Please try with new Email ID');
                  this.jobseekerSignUpdiv = true;

              } 

                if(this.jobseeker.status=="otherError"){ 
                    this.loadinggif=false;
                    this.alertService.error('Network Issue Please try again.');
                    this.jobseekerSignUpdiv = true;

                } 

               
      
            },
            error => {
                this.alertService.error(error);
                this.alertService.error("Unknow Error");
            });
     
   
     }

}
