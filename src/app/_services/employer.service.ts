import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User, Job } from '../_models';
import { Router } from '@angular/router';
import { ServerURL } from './url';



@Injectable()
export class EmployerService implements OnInit {

  constructor(
    private http: HttpClient,
     private router: Router,
     private globalsURL: ServerURL
  ) {

 }

private baseUrl = this.globalsURL.serverURL;

  testResponse: User;
  suburl:string;
  baseurl:string;
  url:string;
  
  ngOnInit(): void {
    }


    validateEmployerUserName(uname: string)
    {
      return this.http.get<User>(this.baseUrl+"validateUserName?username="+uname);
    }
// Common for employer and Job seeker
    validateUserName(uname: string)
    {
      let type="employer";
      return this.http.get<User>(this.baseUrl+"validateUserName?username="+uname+'&type='+type);
    }


    getEmployerLogin(uname: string, pwd: string) {
      this.suburl= 'employerlogin?username='+uname+'&password='+pwd;
      this.url=this.baseUrl+this.suburl;           
      return this.http.get<User>(this.url);
}

    registerEmployer(jobseeker: Job) {         
      return this.http.post<Job>(this.baseUrl+'resgisterEmployer', jobseeker);
  }

}
