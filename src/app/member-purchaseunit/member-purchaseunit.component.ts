import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { User } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-member-purchaseunit',
  templateUrl: './member-purchaseunit.component.html',
  styleUrls: ['./member-purchaseunit.component.css']
})
export class MemberPurchaseunitComponent implements OnInit {
  
  model: any = {};
  user:User;
  loadinggif:boolean = false;
  invoiceList: any={};
  uniteList: any={};
  myBooks: string[] = ['One', 'Two', 'Three'];


  //let list: any[] = [1, true, "free"];
  public div0 = true;
  public div1 = false;
  public div2 = false;
  public div3 = false;
  public div4 = false;
  public div5 = false;
  public div6 = false;
  public div7 = false;
  public div8 = false;


  unitSuccessDialog = 'none';
  OwnTreeSuccessDialog = 'none';
  privateSuccessDialog = 'none';

 
  constructor(
    private userService: UserService,
    private alertService: AlertService 

  ) {     
    //this.div0 = true;
    //this.div1=false;
    //alert("Constractor Mode Called...");

  }

  ngOnInit() {
   // this.div0 = true;
    //this.div1=false;
    
    //alert("Init Mode Called...");

//this.uniteList = { "Unit1","Unit2","U//nit3" };

this.uniteList  = [1, 2, 3, 4, 5 ];

  }

  getTreeName(){
    console.log("-----------Load Tree Name-------------");
  }
  
  homePage(){
  //  alert("homePage");
    this.div0 = true;
    this.div1 = false;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.div5 = false;
    this.div6 = false;
    this.div7 = false;
    this.div8 = false;


  //  alert("Payment Mode Called..."+amount);
  }

  createPublicUnit(numberofUnit: number){
    this.model.numberofUnit=numberofUnit;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.model.userLoginPrimaryKey=primaryKey;
    this.loadinggif = true;
    this.div1 = false;
    this.userService.publicUnitSave(this.model)
    .subscribe(
      data => { 
          this.invoiceList =   data;   
          this.loadinggif = false;
          this.div1 = true;
          this.model.totalAmount=this.invoiceList[0].totalAmount;

          this.unitSuccessDialog = 'block';
      //   alert('Thanks and Successfully Ordered Units...');
               
      },
      error => {
          this.loadinggif = false;
          this.div1 = true;
          this.alertService.error('Network issue please try again');
     }
  );


  }


  
onCloseHandled(){
  this.unitSuccessDialog = 'none';
  this.div0=false;
  this.div1=false;
  this.div2=false;
  this.div3=false;
  this.div4=false;
  this.div5=false;
  this.div6=true;
  this.div7=false;
  this.div8=false;

}


onCloseHandled2(){
  this.OwnTreeSuccessDialog = 'none';
  this.div0=false;
  this.div1=false;
  this.div2=false;
  this.div3=false;
  this.div4=false;
  this.div5=false;
  this.div6=false;
  this.div7=true;
  this.div8=false;


}

onCloseHandled3(){
  this.privateSuccessDialog = 'none';
  this.div0=false;
  this.div1=false;
  this.div2=false;
  this.div3=false;
  this.div4=false;
  this.div5=false;
  this.div6=false;
  this.div7=false;
  this.div8=true;


}


  

  onlinePay(){
    //alert("Online Pay..");
    this.div0=false;
    this.div1=false;
    this.div2=false;
    this.div3=false;
    this.div4=false;
    this.div5=true;
    this.div6=false;
    this.div7=false;
    this.div8=false;

  }

  createOwnTree(numberofUnit: number){
    console.log("Own Tree Number of Units--->"+numberofUnit);
    this.model.numberofUnit=numberofUnit;
    var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
    this.model.userLoginPrimaryKey=primaryKey;
    this.loadinggif = true;
    this.div2 = false;
    this.userService.createOwnTree(this.model)
    .subscribe(
      data => { 
          this.invoiceList =   data; 
          this.loadinggif = false;
          this.div2 = true; 
          console.log("List:"+this.invoiceList); 
          this.model.treeName=this.invoiceList[0].treeName;
          this.model.totalAmount=this.invoiceList[0].totalAmount;

        console.log("Tree Name -->"+this.model.treeName);
          this.OwnTreeSuccessDialog = 'block';
      //   alert('Thanks and Successfully Ordered Units...');
               
      },
      error => {
          this.loadinggif = false;
          this.div2 = true; 
          this.alertService.error('Network issue please try again');
     }
  );


  }

  privateTree(){
    console.log("Ref ID-->"+this.model.refmemberID);
   console.log("Number of Unit-->"+this.model.numberofUnit);
    
   this.userService.getOwnTreeNameValidate(this.model.refmemberID)
   .subscribe(
       memberResponse => {
           this.user = memberResponse;
           //  console.log("Response message -------------------->", this.user.status); 
           if(this.user.status=="Valid")
           {
               //this.alertService.success('GSP ID is available.');
              // alert("Member ID is available");

              var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
              this.model.userLoginPrimaryKey=primaryKey;
              this.loadinggif = true;
              this.div3 = false;
              this.userService.privateUnitSave(this.model)
              .subscribe(
                data => { 
                    this.invoiceList =   data;   
                    this.loadinggif = false;
                    this.div3 = true; 
                    this.model.totalAmount=this.invoiceList[0].totalAmount;
                     this.privateSuccessDialog='block';
          //   alert('Thanks and Successfully Ordered Units...');
               
      },
      error => {
          this.loadinggif = false;
          this.div3 = true; 
          this.alertService.error('Network issue please try again');
     }
  );




           } 
           
           if(this.user.status=="InValid")
           {
          //  alert("Member ID is not Valid.");
               this.alertService.error('GSP ID is not Valid.');
           }                  
       },
     
       error => {
           this.alertService.error(error);
       }); 



  }
  
  wirePayment(){
    //alert("Online Pay..");
    this.div0=false;
    this.div1=false;
    this.div2=false;
    this.div3=false;
    this.div4=false;
    this.div5=false;
    this.div6=true;
    this.div7=false;
    this.div8=false;


  }
  selectPublic(){
    this.div0=false;
    this.div1=true;
    this.div2=false;
    this.div3=false;
    this.div4=false;
    this.div5=false;
    this.div6=false;
    this.div7=false;
    this.div8=false;


  }

  selectOwnTree(){
    this.div0=false;
    this.div1=false;
    this.div2=true;
    this.div3=false;
    this.div4=false;
    this.div5=false;
    this.div6=false;
    this.div7=false;
    this.div8=false;



  }
  
  selectPrivate(){
    this.model.refmemberID='';
    this.model.numberofUnit='';

    this.div0=false;
    this.div1=false;
    this.div2=false;
    this.div3=true;
    this.div4=false;
    this.div5=false;
    this.div6=false;
    this.div7=false;
    this.div8=false;

  }
}
