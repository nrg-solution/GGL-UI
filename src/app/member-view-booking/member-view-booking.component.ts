import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-view-booking',
  templateUrl: './member-view-booking.component.html',
  styleUrls: ['./member-view-booking.component.css']
})
export class MemberViewBookingComponent implements OnInit {
  model: any = {};
  user: any = {};
  loading = false;
  loadinggif:boolean = false;

  public menu2 = false;

  countryList: any = {};
  myReservationList: any = {};
  loadcategorylist:any={};
  
  nodatadialog = 'none';
  foodreserView = 'none';
  ticketreserView = 'none';
  tourreserView = 'none';
  financereserView = 'none';
  educationreserView = 'none';
  insurancereserView = 'none';
  meditreatreserView = 'none';
  healthreserView = 'none';
  herbalreserView = 'none';
  umrahreserView = 'none';
  softhardreserView = 'none';
  energyreserView = 'none';
  reservationRemove = 'none';
  bookingRemovesuccess = 'none';
  bookingRemovefail = 'none';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    

  }
  ngOnInit() {
    this.clickMenu2();

    this.userService.getCountry()
      .subscribe(
        data => {
          this.countryList = data;
        },
        error => {
              alert('Network issue please try again');
        }
    );
          
  }

  clickMenu2(){
    this.model.categoryname = '';
    this.model.fromDate = '';
    this.model.toDate = '';
    
    this.userService.getAllCategoryList()
    .subscribe(
      data => {
          this.loadcategorylist = data;
      },
      error => {
      });
      
    this.loadinggif = true;
    this.menu2=false;
    this.userService.getMyReservationDetails(localStorage.getItem('userloginPrimaryKeyString'))
    .subscribe(
        data => {
          this.myReservationList = data;
          if(this.myReservationList.length==0){
            this.loadinggif = false;
            this.nodatadialog = 'block';
            this.menu2=true;
          }else{
            this.loadinggif = false;
            this.menu2=true;
          }
        },
        error => {
          this.loadinggif = false;
          this.menu2=true;
          alert('Network issue please try again');
        }
    );
  }

  ReservationView(categoryname:string,invoiceNumber:string,userloginPrimaryKeyString:string){
    this.userService.getMyReservationView(invoiceNumber,userloginPrimaryKeyString)
      .subscribe(
          data => {
            this.user = data;
            if(categoryname == 'Food and hotels'){
              this.foodreserView = 'block';
            }
            if(categoryname == 'Ticketing'){
              this.ticketreserView = 'block';
            }
            if(categoryname == 'Travel and Tour'){
              this.tourreserView = 'block';       
            }
            if(categoryname == 'Financial Solution'){
              this.financereserView = 'block';
            }
            if(categoryname == 'Education'){
              this.educationreserView = 'block';
            }
            if(categoryname == 'Insurance'){
              this.insurancereserView = 'block';
            }
            if(categoryname == 'Medical Treatment'){
              this.meditreatreserView = 'block';
            }
            if(categoryname == 'Health Accessories'){
              this.healthreserView = 'block';
            }
            if(categoryname == 'Umrah'){
              this.umrahreserView = 'block';
            }
            if(categoryname == 'Herbal Product'){
              this.herbalreserView = 'block';
            }
            if(categoryname == 'Software And Hardware'){
              this.softhardreserView = 'block';
            }
            if(categoryname == 'Energy Saving'){
              this.energyreserView = 'block';
            }
          },
          error => {
          }
      );
  }

  onCloseHandled(){
    this.nodatadialog = 'none';
    this.foodreserView = 'none';
    this.ticketreserView = 'none';
    this.tourreserView = 'none';
    this.financereserView = 'none';
    this.educationreserView = 'none';
    this.insurancereserView = 'none';
    this.meditreatreserView = 'none';
    this.healthreserView = 'none';
    this.herbalreserView = 'none';
    this.umrahreserView = 'none';
    this.softhardreserView = 'none';
    this.energyreserView = 'none';
    this.reservationRemove = 'none';
    this.bookingRemovesuccess = 'none';
    this.bookingRemovefail = 'none';
  }

  ReservationCancel(invoiceNumber:string,userloginPrimaryKeyString:string){
    this.userService.getMyReservationView(invoiceNumber,userloginPrimaryKeyString)
      .subscribe(
          data => {
              this.user=data;
              this.reservationRemove='block';
          },
          error => {

          }
      ); 
  }

  onDeleteBooking(invoiceNumber:string,userLoginPrimaryKey:number){
    this.reservationRemove='none';      
      this.userService.setBookingRemove(invoiceNumber,userLoginPrimaryKey)
      .subscribe(
          data => { 
              this.user = data; 
              if(this.user.status=="success"){
                this.bookingRemovesuccess = "block";
                this.clickMenu2();
              }else if(this.user.status=="failure"){
                this.bookingRemovefail = "block";
                this.clickMenu2();
              }
          },
          error => {
            alert('Network issue please try again');
          }
      ); 
  }

}
