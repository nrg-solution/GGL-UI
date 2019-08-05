import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { User } from '../_models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  imgsrc: string;
  ///show: boolean = false;
  model: any = {};

  publicTree=false;
  privateTree=false;
  ownTree=false;
  pulbicMemberList: any = {};
  privateMemberList: any = {};
  ownMemberList: any = {};

  user:User;

  showFile = false
  paymentUploads: Observable<string[]>
  @Input() fileUpload: string;

  paymentDialog = 'none';
  publicUnitReject = 'none';
  publicUnitApprove = 'none';
  networkError='none';
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private uploadService:AuthenticationService

  ) { 
    this.imgsrc="assets/images/logo.jpg";

  }

  ngOnInit() {
    this.imgsrc="assets/images/logo.jpg";
    this.getPublicTreeNonApprovedData();
  }

  approvePublicUnit(value2: string) {
//alert("---------Public-------");
console.log("Public Temp -->"+value2);
this.model.refmemberID= value2;

this.userService.approvePublic(this.model) 
   .subscribe(
     data => {
     this.user=data;
     console.log("Public Tree Approve Status --->"+this.user.status);
if(this.user.status=="good"){
  this.publicUnitApprove='block';
  //alert("Successfully Approved Public Tree Unit...");
  this.getPublicTreeNonApprovedData();
}
else {
  this.networkError='block';
  //alert("Some Data is missing issue , Please check with system admin..");

}

   },
   error => {
    this.networkError='block';
  }
 );

  }


  //

  rejectPublicUnit(value1: string) {
    console.log("Public Temp -->"+value1);
    this.model.refmemberID= value1;

    this.userService.rejectPublic(this.model) 
    .subscribe(
      data => {
      this.user=data;
      console.log("Public Tree Reject Status --->"+this.user.status);
 if(this.user.status=="good"){
  this.publicUnitReject = "block";

  //alert("Successfully Rejected Public Tree Unit...");
   this.getPublicTreeNonApprovedData();
 }
 else {
  this.networkError='block';
 
 }
 
    },
    error => {
      this.networkError='block';
    }
  );

}


// Reject Private Tree
rejectPrivateUnit(value1: string) {
  console.log("priveate Temp -->"+value1);
  this.model.refmemberID= value1;

  this.userService.rejectPrivate(this.model) 
  .subscribe(
    data => {
    this.user=data;
    console.log("Private Tree Reject Status --->"+this.user.status);
if(this.user.status=="good"){
this.publicUnitReject = "block";

//alert("Successfully Rejected Public Tree Unit...");
 this.getPrivateTreeNonApprovedData();
}
else {
  this.networkError='block';

}

  },
  error => {
    this.networkError='block';
  }
);

}

// Reject Own Tree rejectOwnUnit

rejectOwnUnit(value1: string) {
  console.log("rejectOwnUnit Temp -->"+value1);
  this.model.refmemberID= value1;

  this.userService.rejectOwnTree(this.model) 
  .subscribe(
    data => {
    this.user=data;
    console.log("Own Tree Reject Status --->"+this.user.status);
if(this.user.status=="good"){
this.publicUnitReject = "block";

//alert("Successfully Rejected Public Tree Unit...");
this.getOwnTreeNonApprovedData();
}
else {
  this.networkError='block';

}

  },
  error => {
    this.networkError='block';
  }
);

}
  approvePrivateUnit(value1 : string) {
    console.log("Value 1-->"+value1);
    // approvePrivateUnit

   // alert("---------Private Approve -------");
    this.model.refmemberID= value1;
    console.log("User ID-->"+this.model.refmemberID)
    this.userService.approvePrivate(this.model) 
   .subscribe(
     data => {
     this.user=data;
     console.log("Private Tree Approve Status --->"+this.user.status);
if(this.user.status=="good"){
  this.publicUnitApprove='block';

//  alert("Successfully Approved");
  this.getPrivateTreeNonApprovedData();
}
else {
  this.networkError='block';

}

   },
   error => {
    this.networkError='block';
  }
 );

 
  }



 approveOwnUnit(value1 : string) {
  console.log("Value 1-->"+value1);
  // approvePrivateUnit

 // alert("---------Private Approve -------");
  this.model.refmemberID= value1;
    //alert("---------Own-------");
    console.log("User ID-->"+this.model.refmemberID)
    this.userService.approveOwnTree(this.model) 
   .subscribe(
     data => {
     this.user=data;
     console.log("approveOwnTree Tree Approve Status --->"+this.user.status);
if(this.user.status=="good"){
  this.publicUnitApprove='block';

//  alert("Successfully Approved");
  this.getOwnTreeNonApprovedData();
}
else {
  this.networkError='block';

}

   },
   error => {
    this.networkError='block';
  }
 );
  }

  getPrivateTreeNonApprovedData(){

   this.userService.getTempPrivateTree() 
   .subscribe(
     data => {
     this.privateMemberList = data;
     this.privateTree=true;
     this.publicTree=false;
     this.ownTree=false;
   },
   error => {
    this.networkError='block';
  }
 );



    
   

console.log("----------Approve private Tree----------");
  }
  getPublicTreeNonApprovedData(){
   // this.show=true;



   this.userService.getTempPublicTree() 
   .subscribe(
     data => {
     this.pulbicMemberList = data;
     this.publicTree=true;
     this.ownTree=false;
     this.privateTree=false;
   },
   error => {
    this.networkError='block';
  }
 );



   
    console.log("----------Approve Public Tree----------");

  }
  getOwnTreeNonApprovedData(){


      this.userService.getTempOwnTree() 
      .subscribe(
        data => {
        this.ownMemberList = data;
        this.ownTree=true;
        this.publicTree=false;
        this.privateTree=false;
      },
      error => {
        this.networkError='block';
      }
    );

    
   

    console.log("----------Approve Own Tree----------");

  }

  publicViewPayment(invoiceCode:string){
    let treeName = "publicTree";
    console.log("Public View Payment Invoice Number ---->"+invoiceCode + "Tree name -->"+treeName);
    this.paymentUploads = this.uploadService.getPaymentView(invoiceCode,treeName);
    this.paymentDialog = "block";
  }

  privateViewPayment(invoiceCode:string){
    let treeName = "privateTree";
    console.log("Private View Payment Invoice Number ---->"+invoiceCode + "Tree name -->"+treeName);
    this.paymentUploads = this.uploadService.getPaymentView(invoiceCode,treeName);
    this.paymentDialog = "block";
  }

  ownViewPayment(invoiceCode:string){
    let treeName = "ownTree";
    console.log("Own View Payment Invoice Number ---->"+invoiceCode + "Tree name -->"+treeName);
    this.paymentUploads = this.uploadService.getPaymentView(invoiceCode,treeName);
    this.paymentDialog = "block";
  }

  onCloseHandled(){
    this.paymentDialog = 'none';
  }

  onClosePublicReject(){
    this.publicUnitReject = 'none';
  }
  onClosePublicApprove(){
    this.publicUnitApprove = 'none';
  }
  onCloseNetWorkError(){
    this.networkError = 'none';
  }
  
  
  
}
