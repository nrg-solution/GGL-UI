import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { User } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-member-myprofile',
  templateUrl: './member-myprofile.component.html',
  styleUrls: ['./member-myprofile.component.css']
})
export class MemberMyprofileComponent implements OnInit {
  model: any = {};
  user:User;
  loading = false;
  countryList: any = {};

  public menu6 = false;
  public profilediv = false;

  successdialog ='none';
  failuredialog ='none';
  networkissue ='none';
    
  constructor(
    private userService: UserService,
    private alertService: AlertService 
  ) {

  }

  ngOnInit() {

      this.userService.getMyProfile(localStorage.getItem('userloginPrimaryKeyString'))
      .subscribe(
        data => {
          this.user=data;
          this.menu6=true;
        },
        error => {
            this.menu6=true;
        } 
      ); 

      this.userService.getCountry()
      .subscribe(
        data => {
          this.countryList = data;
        },
        error => {  }
      );

  }

  onMenuClick(value: string): void {
    if(value=="ProfileEdit"){ 
      this.OnEdit();
    }
    
    if(value=="myprofileback"){ 
      this.myprofileback();
    }
  }

  OnEdit (){
    this.profilediv = true;
    this.menu6 = false;       
  }
   
  myprofileback(){
    this.menu6 = true; 
    this.profilediv = false; 
  }
   
  updateMyProfile(){      
    this.loading= true;           
    this.user.userloginPrimaryKeyString = localStorage.getItem("userloginPrimaryKeyString");   
    this.userService.updateMyProfile(this.user)
    .subscribe(
      data => {
          this.user= data;
          if(this.user.status=="success") {
            this.loading= false; 
            this.successdialog ="block";
          }
  
          if(this.user.status=="failure") {
            this.loading= false; 
            this.failuredialog = "block";
          }
      },
      error => {
          this.loading= false; 
          this.networkissue = "block";
      });    
  }

  onCloseHandled(){
    this.successdialog ='none';
    this.failuredialog ='none';
    this.networkissue ='none';
  }

}
