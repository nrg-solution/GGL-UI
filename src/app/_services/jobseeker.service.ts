import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Job, User  } from '../_models';
import { Router } from '@angular/router';
import { ServerURL } from './url';


@Injectable()
export class JobSeekerService implements OnInit {

  constructor(
    private http: HttpClient,
     private router: Router,
     private globalsURL: ServerURL
  ) {

 }

private baseUrl = this.globalsURL.serverURL;
  suburl:string;
  baseurl:string;
  url:string;
  
    ngOnInit(): void {
    //console.log("URL ----------->"+this.globalsURL.serverURL);
    }

    validateJobSeekerUserName(uname: string)
    {
      let type="jobseeker";
      return this.http.get<User>(this.baseUrl+"validateUserName?username="+uname+'&type='+type);

      //return this.http.get<User>(this.baseUrl+"validateJobSeekerUserName?username="+uname);
    }

    getIndustry()
    {
     return this.http.get(this.baseUrl+'getIndustry');
    }
  
    getJobSeekersLogin(uname: string, pwd: string) {
      this.suburl= 'jobseekerslogin?username='+uname+'&password='+pwd;
    //  this.baseurl=this.userUrl;
      this.url=this.baseUrl+this.suburl;           
      return this.http.get<User>(this.url);
}

    resgisterJobSeeker(jobseeker: Job) {         
       return this.http.post<Job>(this.baseUrl+'resgisterJobSeeker', jobseeker);
   }
}
