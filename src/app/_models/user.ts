import { Common } from "./common";

export class User extends Common{

   id: string; 
    numberofUnit:number;
  // UI Request fields 
   
   memberNumber: string;
   currentusername: string;
   currentpassword: string;
   firstName: string;
   lastName: string;
   treeName:string;
   //username: string;
   //password: string;
   //country: string;
   //phoneNumber: string;
   //emailID: string;
   refmemberID:string;
   bankName:string;
   bankAcctNumber:string;
   actType:string;
   //status:string;
   created_date:any;
   agreement:string;
   //address:string;
   //qualification:string;
   companyType:string;

  // Request Hotel booking UI fields
  selectedCountry:string;
  selectedState:string; 
  categoryname:string;
  cname:string;
  chechInDate:any;
  noofrooms:string;
  noofchild:string;
  noofadult:string;  
  bookingdate:any; 
  bookingtime:any;
  noofTables:number;
  bookingStatus:string;
  
  // Menu 3 view 
  commition:string;

  // Response 5 menu view
  memberID:string;
  memberName:string;
  memberType:string;
  memberEmail:string;
  memberPhone:string;
  memberCommition:number;
  memberOvrriding:number;
  memberStatus:string;
  userLoginPrimaryKey:number;
  userloginPrimaryKeyString: string;
  requestType:string;
  
  // Response 
  userRole:string;
  groupName:number;
  sNo:number;

  totalAmount:number;
  grandTotal:number;
  otp:string;
  departurename:string;
  companyinsurance:string;

// new
  airname:string;
  departure:any;
  returndate:any;
  fromplace:string;
  toplace:string;
  noofpax:string;
  triptype:string;
  arrivaldate:any;
  visitcountry:string;
  appointmentdate:any;
  financialtime:any;
  university:string;
  study:string;
  yearofstudy:string;
  categoryinsurance:string;
  hospitalname:string;
  medicaltime:any;
  treatment:string;
  categoryproduct:string;
  listproduct:string;
  quantity:any;
  category:string;
  companyname:string;
  file:File;
  description:string;
  categoryCode:string;
  bookingCode:string;
}
