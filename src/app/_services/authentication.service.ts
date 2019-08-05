import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User, Common } from '../_models/index';
import { HttpRequest, HttpEvent} from '@angular/common/http';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { ServerURL } from './url';
//import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService  implements OnInit{

  constructor(
    private http: HttpClient,
     private router: Router,
     private globalsURL: ServerURL

  ) {

 }

 //@Injectable()
 //url:ServerURL;

 

private baseUrl = this.globalsURL.serverURL;

  testResponse: User;
  suburl:string;
  baseurl:string;
   url:string;
  
  ngOnInit(): void {
    }

    
    resetPassword(pwd: string , uname: string) 
    {
    //  console.log("URL ------------>"+this.url.ServerURL)
      return this.http.get<User>(this.baseUrl+"resetPassword?newPassword="+pwd+"&userName="+uname);
    }

    checkUserName(uname: string)
    {
      return this.http.get<User>(this.baseUrl+"Checkuser?username="+uname);
    }

    OTPCheck(otp: string)
    {
      return this.http.get<User>(this.baseUrl+"OTPCheck?otp="+otp);
    }

     login(uname: string, pwd: string) {
           this.suburl= '?username='+uname+'&password='+pwd;
          // this.baseurl=this.userUrl+"user";
           this.baseurl=this.baseUrl+"user";           
           this.url=this.baseurl+this.suburl;           
           return this.http.get<User>(this.url);
    }

    logout() {
        localStorage.removeItem('currentusername');
        this.router.navigate(['/login']);
    }

    pushImageToStorage(file: File,uploadPk :string): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();
      formdata.append('file', file);
      formdata.append('uploadPk', uploadPk);
      const req = new HttpRequest('POST', this.baseUrl+"imageUpload", formdata, {
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }

    pushFileToStorage(file: File,memberID :string): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();
  
      formdata.append('file', file);
      formdata.append('memberID', memberID);
      const req = new HttpRequest('POST', this.baseUrl+"paymentUplaod", formdata, {
        reportProgress: true,
        responseType: 'text'
      });
  
      return this.http.request(req);
    }

    getMemberIDValidate(memberID:string){
      return this.http.get<User>(this.baseUrl+"getMemberIDValidate?memberID="+memberID);
    }

    getValidateTempTree(invoiceNumber:string,treeName:string){
      return this.http.get<User>(this.baseUrl+"getValidateTempTree?invoiceNumber="+invoiceNumber+"&treeName="+treeName);
    }


    getFiles(memberID:string): Observable<string[]> {
      return this.http.get<string[]>(this.baseUrl+"getallfiles?memberID="+memberID);
    }

    saveImage(file: File,uploadPk :string): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();
      formdata.append('file', file);
      formdata.append('uploadPk', uploadPk);
      const req = new HttpRequest('POST', this.baseUrl+"saveImage", formdata, {
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }

    storeImage(file: File,invoiceNumber :string,treeName :string): Observable<HttpEvent<{}>> {
      console.log("----- Inside StoreImage Method --------")
      let formdata: FormData = new FormData();
      formdata.append('file', file);
      formdata.append('invoiceNumber', invoiceNumber);
      formdata.append('treeName', treeName);
      const req = new HttpRequest('POST', this.baseUrl+"paymentImageUplaod", formdata, {
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }

    getPaymentView(invoiceCode:string,treeName:string): Observable<string[]> {
      console.log("URL-->"+this.baseUrl+"getPaymentView?invoiceCode="+invoiceCode+"&treeName="+treeName);
      return this.http.get<string[]>(this.baseUrl+"getPaymentView?invoiceCode="+invoiceCode+"&treeName="+treeName);
    }

    saveBookingImage(file: File,uploadPk :string): Observable<HttpEvent<{}>> {
      let formdata: FormData = new FormData();
      formdata.append('file', file);
      formdata.append('uploadPk', uploadPk);
      const req = new HttpRequest('POST', this.baseUrl+"saveBookingImage", formdata, {
        reportProgress: true,
        responseType: 'text'
      });
      return this.http.request(req);
    }


  
  }
  