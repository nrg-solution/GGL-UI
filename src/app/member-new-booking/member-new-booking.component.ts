import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/index';

@Component({
  selector: 'app-member-new-booking',
  templateUrl: './member-new-booking.component.html',
  styleUrls: ['./member-new-booking.component.css']
})
export class MemberNewBookingComponent implements OnInit {
  model: any = {};
  user:User;
  loading = false;
  loadinggif:boolean = false;

  public menu0 = false;
  public menu1 = false;
  public tickdiv = false;
  public turtradiv = false;
  public financialdiv = false;
  public educationdiv = false;
  public insurancediv = false;
  public medicaldiv = false;
  public healthaccessorydiv = false;
  public healthdiv = false;
  public umrahdiv = false;
  public softwarediv = false;
  public energysavediv = false;

  loadCountryList: any = {};
  loadStateList: any={};
  loadcategorylist:any={};
  resList: any = {};
  airlist=['Select','Malindo air group','Others'];

  successdialog = 'none';
  failuredialog = 'none';
  networkissuedialog = 'none';

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
  ) {
    
  
  }

  ngOnInit() {
    let selectedCountry=localStorage.getItem('selectedCountry');
    let selectedState=localStorage.getItem('selectedState');
    let cname=localStorage.getItem('cname');
    this.clickMenu1(cname,selectedCountry,selectedState);
    this.userService.loadCountry() 
    .subscribe(
        data => {
            this.loadCountryList = data;
        },
        error => {
          this.networkissuedialog = 'block';
        }
    );
  }

  onChooseCountry(){
    this.loadinggif = true;
    this.menu1 = false;
    this.userService.loadState(this.model.selectedCountry)
      .subscribe(
        data => {
          this.loadStateList = data;
          this.loadinggif = false;
    		  this.menu1 = true;
        },
        error => {
            this.loadinggif = false;
            this.menu1 = true;
            this.networkissuedialog = 'block';
        }
      );
  }
  
  onChooseCategory() {
    this.loadinggif = true;
    this.menu1 = false;
    this.userService.loadCategoryList(this.model.selectedCountry,this.model.selectedState)
      .subscribe(
      data => {
        this.loadcategorylist = data;
        this.loadinggif = false;
        this.menu1 = true;
      },
      error => {
          this.loadinggif = false;
          this.menu1 = true;
          this.networkissuedialog = 'block';
      }
      );
  }

  getHotel() {
    this.userService.getHotel(this.model)
      .subscribe(
        data => {
          this.resList = data;
        },
        error => {
          this.networkissuedialog = 'block';
        }
      );
  }

  saveReserNext(){
    console.log("Country name ---->"+this.model.selectedCountry);
    console.log("State name ---->"+this.model.selectedState);
    console.log("Category name ---->"+this.model.categoryname);
    this.getHotel();
       
    if(this.model.categoryname == 'Food and hotels'){
        this.menu0 = false;
        this.menu1 = true;
    }
    if(this.model.categoryname == 'Ticketing'){
      this.menu0 = false;
      this.tickdiv = true;
    }
    if(this.model.categoryname == 'Travel and Tour'){
      this.menu0 = false;
      this.turtradiv = true;      
    }
    if(this.model.categoryname == 'Financial Solution'){
      this.menu0 = false;
      this.financialdiv = true;       
    }
    if(this.model.categoryname == 'Education'){
      this.menu0 = false;
      this.educationdiv = true; 
    }
    if(this.model.categoryname == 'Insurance'){
      this.menu0 = false;
      this.insurancediv = true;
    }
    if(this.model.categoryname == 'Medical Treatment'){
      this.menu0 = false;
      this.medicaldiv = true;
    }
    if(this.model.categoryname == 'Health Accessories'){
      this.menu0 = false;
      this.healthaccessorydiv = true;
    }
    if(this.model.categoryname == 'Umrah'){
      this.menu0 = false;
      this.umrahdiv = true;
    }
    if(this.model.categoryname == 'Herbal Product'){
      this.menu0 = false;
      this.healthdiv = true;
    }
    if(this.model.categoryname == 'Software And Hardware'){
      this.menu0 = false;
      this.softwarediv = true;  
    }
    if(this.model.categoryname == 'Energy Saving'){
      this.menu0 = false;
      this.energysavediv = true;   
    }
  }

  onMenuClick(value: string): void {
    if(value=="menu1"){ 
        this.backToMenu1();
    }
    if(value=="back"){ 
      this.clickMenu0();
    }
  }

  clickMenu0(){
    this.menu0 = true;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname=''; 
    this.model.bookingdate=''; 
    this.model.bookingtime=''; 
    this.model.noofTables=''; 
    this.model.airname=''; 
    this.model.departure=''; 
    this.model.return='';
    this.model.fromplace='';
    this.model.toplace='';
    this.model.noofpax='';
    this.model.triptype='';
    this.model.arrivaldate='';
    this.model.visitcountry='';
    this.model.category='';
    this.model.appointmentdate='';
    this.model.financialtime='';
    this.model.university='';
    this.model.study='';
    this.model.yearofstudy='';
    this.model.categoryinsurance='';
    this.model.companyinsurance='';
    this.model.hospitalname='';
    this.model.medicaltime='';
    this.model.treatment='';
    this.model.categoryproduct='';
    this.model.listproduct='';
    this.model.quantity='';
    this.model.companyname='';
  }

  clickMenu1(cname:string,selectedCountry:string,selectedState:string){
    this.model.companyname = cname;
    this.model.selectedCountry = selectedCountry;
    this.model.selectedState = selectedState;
    console.log("Company Name -->"+this.model.companyname);
    console.log("Country Name -->"+this.model.selectedCountry);
    console.log("State Name -->"+this.model.selectedState);
    this.menu1 = true;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;
  }

  backToMenu1(){
    this.menu1 = true;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState='';
    this.model.categoryname='';
    this.model.cname='';
    this.model.noofadult='';
    this.model.noofchild='';
    this.model.noofrooms=''; 
    this.model.noofTables=''; 
    this.model.companyname ='';
    this.model.medicaltime='';
    this.model.bookingdate='';
  }

  saveReservation(){
    this.loadinggif=true;
    this.menu1 = false;
    //this.model.selectedCountry = "Indonesia";
    //this.model.selectedState = "Bangka Belitung";
    this.model.categoryname = "Food and hotels";
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
  
            if(this.user.status=="success"){
              this.loadinggif=false;
              this.menu1 = true;
              this.successdialog="block"; 
              this.backToMenu1();
            }
            if(this.user.status=="failure"){   
              this.loadinggif=false;
              this.menu1 = true;   
              this.failuredialog="block";                                
              this.backToMenu1();
  
            }   
          },
          error => {
            this.networkissuedialog = 'block';
            this.loadinggif=false;
            this.menu1 = true;
            this.loading = false;
          }
      );
    }

  saveticketReservation(){   
    this.loadinggif=true;
    this.tickdiv = false; 
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.tickdiv = true;
                this.successdialog = 'block';
                this.Ticket();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.tickdiv = true;
                this.failuredialog = 'block';
                this.Ticket();
            }                
          },
          error => {
              this.loadinggif=false;
              this.tickdiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      ); 
  }
  savetravelReservation(){
    this.loadinggif=true;
    this.turtradiv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.turtradiv = true;
                this.successdialog = 'block';
                this.Travel();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.turtradiv = true;
                this.failuredialog = 'block';
                this.Travel();
            }                
          },
          error => {
              this.loadinggif=false;
              this.turtradiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      ); 

  }
  savefinanancialReservation(){
    this.loadinggif=true;
    this.financialdiv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.financialdiv = true;
                this.successdialog = 'block';
                this.Finance();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.financialdiv = true;
                this.failuredialog = 'block';
                this.Finance();
            }                
          },
          error => {
              this.loadinggif=false;
              this.financialdiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      ); 
  }
  saveeducationReservation(){
    this.loadinggif=true;
    this.educationdiv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.educationdiv = true;
                this.successdialog = 'block';
                this.Education();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.educationdiv = true;
                this.failuredialog = 'block';
                this.Education();
            }                
          },
          error => {
              this.loadinggif=false;
              this.educationdiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      ); 
  }
  saveinsuranceReservation(){
    this.loadinggif=true;
    this.insurancediv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
    .subscribe(
        data => {
          this.user=data;
          console.log("Status --->", this.user.status);
          if(this.user.status=="success"){
              this.loadinggif=false;
              this.insurancediv = true;
              this.successdialog = 'block';
              this.Insurance();
          }
          if(this.user.status=="failure"){
              this.loadinggif=false;
              this.insurancediv = true;
              this.failuredialog = 'block';
              this.Insurance();
          }                
        },
        error => {
            this.loadinggif=false;
            this.insurancediv = true;
            this.networkissuedialog = 'block';
            this.loading = false;
        }
    ); 
  }
  
  savemedicalReservation(){
    this.loadinggif=true;
    this.medicaldiv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.medicaldiv = true;
                this.successdialog = 'block';
                this.Medical();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.medicaldiv = true;
                this.failuredialog = 'block';
                this.Medical();
            }                
          },
          error => {
              this.loadinggif=false;
              this.medicaldiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      );
  }
  
  savehealthReservation(){
    this.loadinggif=true;
    this.healthaccessorydiv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.healthaccessorydiv = true;
                this.successdialog = 'block';
                this.HealthAccessory();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.healthaccessorydiv = true;
                this.failuredialog = 'block';
                this.HealthAccessory();
            }                
          },
          error => {
              this.loadinggif=false;
              this.healthaccessorydiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      );
  }
  
  saveherbalReservation(){
    this.loadinggif=true;
    this.healthdiv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.healthdiv = true;
                this.successdialog = 'block';
                this.Herbal();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.healthdiv = true;
                this.failuredialog = 'block';
                this.Herbal();
            }                
          },
          error => {
              this.loadinggif=false;
              this.healthdiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      );
  }
  
  saveumrahReservation(){
    this.loadinggif=true;
    this.umrahdiv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.umrahdiv = true;
                this.successdialog = 'block';
                this.Umrah();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.umrahdiv = true;
                this.failuredialog = 'block';
                this.Umrah();
            }                
          },
          error => {
              this.loadinggif=false;
              this.umrahdiv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      );
  }
  
  savesoftwareReservation(){
    this.loadinggif=true;
    this.softwarediv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.softwarediv = true;
                this.successdialog = 'block';
                this.SoftwareandHardware();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.softwarediv = true;
                this.failuredialog = 'block';
                this.SoftwareandHardware();
            }                
          },
          error => {
              this.loadinggif=false;
              this.softwarediv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      );
  }
  saveenergyReservation(){
    this.loadinggif=true;
    this.energysavediv = false;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.userService.saveReservation(this.model,primaryKey)
      .subscribe(
          data => {
            this.user=data;
            console.log("Status --->", this.user.status);
            if(this.user.status=="success"){
                this.loadinggif=false;
                this.energysavediv = true;
                this.successdialog = 'block';
                this.Energysave();
            }
            if(this.user.status=="failure"){
                this.loadinggif=false;
                this.energysavediv = true;
                this.failuredialog = 'block';
                this.Energysave();
            }                
          },
          error => {
              this.loadinggif=false;
              this.energysavediv = true;
              this.networkissuedialog = 'block';
              this.loading = false;
          }
      );
  }

  onCloseHandled(){
    this.successdialog = 'none';
    this.failuredialog = 'none';
    this.networkissuedialog = 'none';
  }

  Ticket(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = true; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

	  this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname=''; 
	  this.model.airname=''; 
	  this.model.departure=''; 
    this.model.returndate='';
	  this.model.fromplace='';
    this.model.toplace='';
	  this.model.noofpax='';
    this.model.triptype='';
  }

  Travel(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = true;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.departurename='';
    this.model.arrivaldate='';
    this.model.visitcountry='';
	  this.model.category='';
    this.model.noofadult=''; 
    this.model.noofchild='';
  }

  Finance(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = true; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.appointmentdate='';
    this.model.medicaltime='';
    this.model.noofpax='';
  }

  Education(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = true;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.university='';
    this.model.study='';
    this.model.yearofstudy='';
  }

  Insurance(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = true; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.categoryinsurance='';
    this.model.companyinsurance='';
    this.model.appointmentdate='';
	  this.model.medicaltime='';
    this.model.noofpax='';
  }

  Medical(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = true;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.hospitalname='';
    this.model.appointmentdate='';
    this.model.medicaltime='';
	  this.model.treatment='';
    this.model.noofpax='';
  }

  HealthAccessory(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = true; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.categoryproduct='';
    this.model.listproduct='';
    this.model.quantity='';
  }

  Herbal(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = true;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.categoryproduct='';
    this.model.quantity='';
  }

  Umrah(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = true; 
    this.softwarediv = false;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.appointmentdate='';
    this.model.arrivaldate='';
	  this.model.noofpax='';
	  this.model.category='';
  }

  SoftwareandHardware(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = true;
    this.energysavediv = false;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
	  this.model.companyname='';
    this.model.listproduct='';
	  this.model.appointmentdate='';
	  this.model.medicaltime='';
  }

  Energysave(){
    this.menu0 = false;
    this.menu1 = false;
    this.tickdiv = false; 
    this.turtradiv = false;
    this.financialdiv = false; 
    this.educationdiv = false;
    this.insurancediv = false; 
    this.medicaldiv = false;
    this.healthaccessorydiv = false; 
    this.healthdiv = false;
    this.umrahdiv = false; 
    this.softwarediv = false;
    this.energysavediv = true;

    this.model.selectedCountry='';
    this.model.selectedState=''; 
    this.model.categoryname='';
    this.model.listproduct='';
	  this.model.quantity='';
  }

}
