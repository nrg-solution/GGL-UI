import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/index';
import { Dropbox } from '../_models/index';
import { ServerURL } from './url';


@Injectable()
export class UserService {    
    //baseURL:string;
    suburl:string;

    private commonURL = this.globalsURL.serverURL;

     //  let arr4: Array<Dropbox> = [];
    constructor(private http: HttpClient, private globalsURL: ServerURL) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }  
  
    getOwnTreeNameValidate(refmemberID: string) {
        return this.http.get<User>(this.commonURL + 'getOwnTreeNameValidate?memberID='+refmemberID);
        
    }


    saveReservation(user: User,primaryKeyStr: string){
        user.userloginPrimaryKeyString = primaryKeyStr;
        return this.http.post<User>(this.commonURL+'saveReservation',user);
    }

    loadState(sCountry: string) {
        var baseURL = this.commonURL+"loadState";
        var subURL = "?country=" +sCountry;
        var FinalURL;
        FinalURL = baseURL+subURL;
        return this.http.get(FinalURL);   
    }

    loadCategoryList(selectedCountry:string,selectedState: string) {
        return this.http.get(this.commonURL+'loadCategory?selectedCountry='+selectedCountry+'&selectedState='+selectedState);
    }

    // Member ID check
  
    getMemberIDValidate(refmemberID: string) {
        return this.http.get<User>(this.commonURL + 'getMemberIDValidate?memberID='+refmemberID);
//        return this.http.get<User>(this.commonURL + 'validateMember?memberID='+refmemberID);

    }

    // Create new Register
    create(user: User) {
       //console.log("Member ID ----------->"+user.refmemberID);
       //console.log("Email ID ----------->"+user.emailID);
       //console.log("Country ----------->"+user.selectedCountry);
      // console.log("Phone number ----------->"+user.phoneNumber);
      
      // console.log("First name ----------->"+user.firstName);
      // console.log("Last name ----------->"+user.lastName);
      // console.log("User name ----------->"+user.username);
      // console.log("Password ----------->"+user.password);
       
      // console.log("Bank name ----------->"+user.bankName);
     //  console.log("Acct Number ----------->"+user.bankAcctNumber);
     //  console.log("Acct type  ----------->"+user.actType);
       return this.http.post<User>(this.commonURL+'register', user);
//        return this.http.post<User>(this.commonURL+'savemember', user); 

        
    }

 
    getCountry(){
        return this.http.get(this.commonURL+'getAllCountry');
    }

    loadCountry(){
        return this.http.get(this.commonURL+'loadCountryList'); 
    }

    getAllReservationDetails(){
        return this.http.get(this.commonURL+'getAllReservationDetails');
    }  
  
    // Only My reservation
    getMyReservationDetails(primaryKeyStr:string){
       return this.http.get(this.commonURL+'getMyReservationDetails?primaryKeyStr='+primaryKeyStr);
    }   
   
    // ----------------- My member list ----------------------------
    getMyMemberList(memberNumber: string){
       return this.http.get(this.commonURL+'getMyMemberList?memberNumber='+memberNumber);
    }

    // ------------ All member list --------------------
    getAllMemberList(requestType: string){
       return this.http.get(this.commonURL+'getAllMemberList?requestType='+requestType);
    }
    // ------------------------- Approval ------------------------ 
    getApproved(userloginPK:number,requestType:string) {
        return this.http.get<User>(this.commonURL+'getApproved?userLoginPrimaryKey='+userloginPK+'&requestType='+requestType);
        // console.log("Member ID ----------->"+user.refmemberID);
    }  
    // ------------------------- Reservation approval ------------------------ 
    getApprovedForReservation(userloginPK:number,requestType:string) {
        return this.http.get<User>(this.commonURL+'getApprovedForReservation?userLoginPrimaryKey='+userloginPK+'&requestType='+requestType);
        // console.log("Member ID ----------->"+user.refmemberID);
    }  
    getState(sCountry: string) {
        var baseURL = this.commonURL+"getState";
        var subURL = "?country=" +sCountry;
        var FinalURL;// = '';
        FinalURL = baseURL+subURL;
        return this.http.get(FinalURL);     
    }
 
    getCategoryList(state: string) {   
        var baseURL = this.commonURL+"getCategory";
        var subURL = "?category="+state;
        var FinalURL;// = '';
        FinalURL = baseURL+subURL;
        return this.http.get(FinalURL);  
    }

    getHotel(user: User){
        return this.http.post(this.commonURL+'getHotelName',user);
    }
  
    getMyProfile(primaryKeyStr:string){
       return this.http.get<User>(this.commonURL+'getMyProfile?primaryKeyStr='+primaryKeyStr);
    } 

    getMyCommandOverInfo(primaryKeyStr:string){
        return this.http.get(this.commonURL+'getMyCommandOverInfo?primaryKeyStr='+primaryKeyStr);
    } 

    getCompanyInfo(selectedCountry:string){
        return this.http.get(this.commonURL+'getCompanyInfo?selectedCountry='+selectedCountry);   
    } 
 
    // Create new Register
    saveOrganization(user: User) {     
       return this.http.post<User>(this.commonURL+'saveOrg', user);
    }

    //------- Save Category ----------
    saveCategory(user: User){
        return this.http.post<User>(this.commonURL+'saveCategory',user);
    }
    
    getAllCategoryDetails(){
        return this.http.get<User>(this.commonURL+'getAllCategoryDetails');
    }

    getCategoryView(categoryname:string,userLoginPrimaryKey:number){
        return this.http.get<User>(this.commonURL+'getCategoryView?categoryname='+categoryname+'&userLoginPrimaryKey='
        +userLoginPrimaryKey);
    }

    setCategoryUpdate(user: User){
        return this.http.post<User>(this.commonURL+'setCategoryUpdate', user);
    }

    setCategoryRemove(categoryname:string,userLoginPrimaryKey:number){
        return this.http.delete<User>(this.commonURL+'setCategoryRemove?categoryname='+categoryname
        +'&userLoginPrimaryKey='+userLoginPrimaryKey);
    }

    getCompanyView(cname:string,userLoginPrimaryKey:number){
        return this.http.get<User>(this.commonURL+'getCompanyView?cname='+cname
        +'&userLoginPrimaryKey='+userLoginPrimaryKey);
    }

    setCompanyUpdate(user: User){
        return this.http.post<User>(this.commonURL+'setCompanyUpdate', user);
    }

    getCountryInfo(selectedCountry:string,selectedState:string,categoryname:string){
        return this.http.get(this.commonURL+'getCountryInfo?selectedCountry='+selectedCountry+'&selectedState='
            +selectedState+'&categoryname='+categoryname);
    }

    setCompanyRemove(cname:string,userLoginPrimaryKey:number){
        return this.http.delete<User>(this.commonURL+'setCompanyRemove?cname='+cname
        +'&userLoginPrimaryKey='+userLoginPrimaryKey);
    }

    getMyReservationView(invoiceNumber:string,userloginPrimaryKeyString:string){
        return this.http.get<User>(this.commonURL+'getMyReservationView?invoiceNumber='+invoiceNumber
        +'&userloginPrimaryKeyString='+userloginPrimaryKeyString);
    }

    getAllCategoryList(){
        return this.http.get<User>(this.commonURL+'getAllCategoryList');
    } 

    submitWithdraw(user: User){
        return this.http.post<User>(this.commonURL+'submitWith', user);
    }

    getAllWithdrawList(requestType:string){
        return this.http.get<User>(this.commonURL+'getAllWithdrawList?requestType='+requestType);
    }

    getWithdrawApprove(memberCommition:number,memberOvrriding:number,memberID:string,primaryKey:number,requestType:string){
        return this.http.get<User>(this.commonURL+'getApproveForWithdraw?memberCommition='+memberCommition+'&memberOvrriding='
            +memberOvrriding+'&memberID='+memberID+'&primaryKey='+primaryKey+'&requestType='+requestType);
    }

    getprimaryKey(){
        return this.http.get<User>(this.commonURL+'getprimaryKey');
    }

    // Temp Data Public
    getTempPublicTree(){
        return this.http.get<User>(this.commonURL+'getTempPublicTree');
    }
    
 // Temp Data Private
 getTempPrivateTree(){
    return this.http.get<User>(this.commonURL+'getTempPrivateTree');
}

 // Temp Data Private
 getTempOwnTree(){
    return this.http.get<User>(this.commonURL+'getTempOwnTree');
}

 // Approve Private
 approvePrivate(user:User){
     console.log("ID-->"+user.refmemberID);
    return this.http.post<User>(this.commonURL+'approvePrivateUnit',user);
    //return this.http.get(this.commonURL+'getSingleUnitInfo?primaryKey='+primaryKey);

}
 // Approve Own Tree
 approveOwnTree(user:User){
    console.log("ID-->"+user.refmemberID);
   return this.http.post<User>(this.commonURL+'approveOwnTree',user);
   //return this.http.get(this.commonURL+'getSingleUnitInfo?primaryKey='+primaryKey);

}


 // Approve Public Unit
 approvePublic(user:User){
    console.log("ID-->"+user.refmemberID);
   return this.http.post<User>(this.commonURL+'approvePublicUnit',user);
   //return this.http.get(this.commonURL+'getSingleUnitInfo?primaryKey='+primaryKey);

}


 // rejectPublic Public Unit

 // Reject Private  Unit

 // Reject Own Tree

    // rejectPublic Public Unit
    rejectPublic(user:User){
        console.log("rejectPublic ID-->"+user.refmemberID);
        return this.http.post<User>(this.commonURL+'rejectPublic',user);
    }

    // Reject Private  Unit
    rejectPrivate(user:User){
        console.log("rejectPrivate ID-->"+user.refmemberID);
        return this.http.post<User>(this.commonURL+'rejectPrivate',user);
    }

    // Reject Own Tree
    rejectOwnTree(user:User){
        console.log("rejectOwnTree ID-->"+user.refmemberID);
        return this.http.post<User>(this.commonURL+'rejectOwnTree',user);
    }

    updateMyProfile(user:User){
        return this.http.post<User>(this.commonURL+'updateMyProfile', user);
    }
    // publicUnitSave(user: User) {    
    publicUnitSave(user: User){
//       return this.http.post<User>(this.commonURL+'publicUnitSave', user);
       return this.http.post<User>(this.commonURL+'TempPubliTreecUnitSave', user);

    }
    // Private Save privateUnitSave

    privateUnitSave(user: User){
        return this.http.post<User>(this.commonURL+'TempPrivateTreeUnitSave', user);
       // return this.http.post<User>(this.commonURL+'privateUnitSave', user);

    }

    //createOwnTree(user: User){
      //      return this.http.post<User>(this.commonURL+'createOwnTree', user);
        // }
     
         createOwnTree(user: User){
            return this.http.post<User>(this.commonURL+'TempOwnTreeUnitSave', user);
         }
     

    getSingleUnitInfo(primaryKey:string){
        console.log("getSingleUnitInfo-Primary Key--->"+primaryKey);
        return this.http.get(this.commonURL+'getSingleUnitInfo?primaryKey='+primaryKey);
    }  
  
    getSinglePrivateUnitInfo(primaryKey:string,treeName:string){
        return this.http.get(this.commonURL+'getSinglePrivateUnitInfo?primaryKey='+primaryKey+"&treeName="+treeName);
    }  
  
    loadTreeName(){
        return this.http.get(this.commonURL+'loadTreeName');
    }  
  
    

    getMemberDetails(memberID:string,userLoginPrimaryKey:number){
        return this.http.get<User>(this.commonURL+'getMemberDetails?memberID='+memberID+'&userLoginPrimaryKey='+userLoginPrimaryKey);
    }
        
    setMemberRemove(memberID:string,refmemberID:string,userLoginPrimaryKey:number,userloginPrimaryKeyString:string){
        return this.http.delete<User>(this.commonURL+'setMemberRemove?memberID='+memberID+'&refmemberID='+refmemberID
            +'&userLoginPrimaryKey='+userLoginPrimaryKey+'&userloginPrimaryKeyString='+userloginPrimaryKeyString);
    }

    searchHotel(cname:string,categoryname:string,selectedCountry:string,selectedState:string){
        return this.http.get<User>(this.commonURL+'searchHotel?cname='+cname+'&categoryname='
        +categoryname+'&selectedCountry='+selectedCountry+'&selectedState='+selectedState);
    }

setBookingRemove(invoiceNumber:string,userLoginPrimaryKey:number){
        return this.http.delete<User>(this.commonURL+'setBookingRemove?invoiceNumber='+invoiceNumber
        +'&userLoginPrimaryKey='+userLoginPrimaryKey);
    }

}
