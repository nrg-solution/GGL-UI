import { Component, OnInit } from '@angular/core';
import { User, Job } from '../_models';
import { AlertService, UserService, JobSeekerService, EmployerService } from '../_services';

@Component({
  selector: 'app-employersignup',
  templateUrl: './employersignup.component.html',
  styleUrls: ['./employersignup.component.css']
})
export class EmployersignupComponent implements OnInit {

  model: any = {};
  loading = false;
  employer:Job;
  countryList: any = {};
  industryList: any = {};
  public employerSignUpdiv = false;
  loadinggif:boolean = false;

  constructor( private userService: UserService,
    private employerService: EmployerService,
    private jobseekerService: JobSeekerService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.employerSignUpdiv = true;   

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
        this.alertService.error('Error !!!!');
    }
   );
  }
  

  registerEmployer(){    
    this.employerSignUpdiv = false;
    this.loadinggif=true;
    this.employerService.registerEmployer(this.model)
        .subscribe(
            data => {
                this.employer=data;
                console.log("Status ----->"+this.employer.status);    
                if(this.employer.status=="userexits"){
                  this.loadinggif=false;
                  this.alertService.error('Your User ID Already Exist. Please try with Another User ID');
                  this.employerSignUpdiv = true;
                }

                if(this.employer.status=="InvalidEmailID"){
                  this.loadinggif=false;
                  this.alertService.error('Your User ID / Email ID is not valid. Please try again');
                  this.model.emailID='';
                  this.employerSignUpdiv = true;
                }

                if(this.employer.status=="success"){
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
                   this.employerSignUpdiv = true;

                }

                if(this.employer.status=="emailIDExists") {
                  this.loadinggif=false;
                  this.alertService.error('Your Email ID Already Exist. Please try with new Email ID');
                  this.employerSignUpdiv = true;

              } 

                if(this.employer.status=="otherError"){ 
                    this.loadinggif=false;
                    this.alertService.error('Network Issue Please try again.');
                    this.employerSignUpdiv = true;

                } 

               
      
            },
            error => {
                this.alertService.error(error);
                this.alertService.error("Unknow Error");
            });
     
   
     }
  }
