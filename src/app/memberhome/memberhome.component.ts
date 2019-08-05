import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { Dropbox } from '../_models/index';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'app-memberhome',
  templateUrl: './memberhome.component.html',
  styleUrls: ['./memberhome.component.css']
})
export class MemberhomeComponent implements OnInit {
  model: any = {};
  user:User;
  loading = false;
  loadinggif:boolean = false;
  
  hotelList: any = {};
  countryList:any = {};
  //loadcategorylist: any = {};
  stateList: any = {};
  allHotelList:any = {};

  public dashboarddiv = false;
  nodata = 'none';
  noSearchinfo = 'none';

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
      private uploadService:AuthenticationService
  ) {
    console.log("-------------Member Login constructor---------------");

   }

  ngOnInit() {
    console.log("-------------Member Login ngOnInit---------------");
    this.clickDashboard();
    
    this.userService.getCountry()
      .subscribe(
        data => {
          this.countryList = data;
        },
        error => {
              alert('Network issue please try again');
        }
    );
        
    /* this.userService.getAllCategoryList()
    .subscribe(
      data => {
          this.loadcategorylist = data;
      },
      error => {
      }); */

    this.userService.getHotel(this.model)
    .subscribe(
      data => {
          this.allHotelList = data;
      },
      error => {
      });


  } 
  
  clickDashboard(){
    this.loadinggif= true;
    this.dashboarddiv = false;
    this.hotelList='';
  
    this.userService.getCompanyInfo('Malaysia') 
    .subscribe(
      data => {
        this.hotelList = data;
        this.loading=false;
        this.loadinggif= false;
        this.dashboarddiv = true;
      },
      error => {
            this.loading=false;
            this.loadinggif= false;
            this.dashboarddiv = true;
            alert('Network issue please try again');
      }
    );
  }

  getCompanyListDashboard(){
    console.log("Choosen Country for Dashbaord ---------------->"+this.model.selectedCountry);
    this.hotelList='';
    this.loadinggif= true;
    this.dashboarddiv = false;
    this.userService.getCompanyInfo(this.model.selectedCountry)
      .subscribe(
        data => {
            this.hotelList= data;
            this.loadinggif= false;
            this.dashboarddiv = true;
        },
        error => {
            this.loadinggif= false;
            this.dashboarddiv = true;
            alert('Network issue please try again');
        }
      );  
  }

  companyAction(categoryname:string,selectedCountry:string,selectedState:string,cname:string){
    if(categoryname == "Food and hotels"){
      localStorage.setItem('selectedCountry',selectedCountry);
      localStorage.setItem('selectedState',selectedState);
      localStorage.setItem('cname',cname);
      this.router.navigate(['/member-new-booking']);
    }else if(categoryname == "Ticketing"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Travel and Tour"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Financial Solution"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Education"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Insurance"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Medical Treatment"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Health Accessories"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Herbal Product"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Umrah"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Software And Hardware"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }else if(categoryname == "Energy Saving"){
      this.dashboarddiv = true;
      this.nodata = "block";
    }
  }  

  onCloseHandled(){
    this.nodata = 'none';
    this.noSearchinfo = 'none';
  }

  backToDashboard(){
    this.dashboarddiv = true;
  }

  onCountryChoose()
  {
    this.userService.getState(this.model.selectedCountry)
      .subscribe(
      data => {
        this.stateList = data;
      },
      error => {
          alert('Network issue please try again');
      }
    );
  }

  searchHotel(){
    this.userService.searchHotel(this.model.cname,this.model.categoryname,this.model.selectedCountry,
      this.model.selectedState)
      .subscribe(
      data => {
          this.hotelList= data;
          if(this.hotelList.length==0){
              this.noSearchinfo='block';
              this.dashboarddiv=true; 
          }else{
              this.dashboarddiv=true; 
          }
      } ,
      error => {
          this.dashboarddiv=false; 
      });
  }

}
