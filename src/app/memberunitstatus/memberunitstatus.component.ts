import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { User } from '../_models';

@Component({
  selector: 'app-memberunitstatus',
  templateUrl: './memberunitstatus.component.html',
  styleUrls: ['./memberunitstatus.component.css']
})
export class MemberunitstatusComponent implements OnInit {
  model: any = {};
  user:User;
  memberUnitList: any = {};
  treeList: any = {};

  public memberHOmeDive = false;
  public div1 = false;
  public div2 = false;
  nodataFound='none';

  constructor(
    private userService: UserService

  ) { }

  ngOnInit() {

    this.memberHOmeDive=true;

   
}

statusOfPublicTree(){
  this.memberUnitList="";
 // Call to load the My Unit Info
 var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
 console.log("status Of Public Tree PK-->"+primaryKey);
 // this.model.userLoginPrimaryKey=primaryKey;
  this.userService.getSingleUnitInfo(primaryKey) 
  .subscribe(
   data => {
  // alert(data);
    this.memberUnitList = data;
    


    console.log("statusOfPublicTree List Size-------------->"+Object.keys(this.memberUnitList).length);
  
    if(Object.keys(this.memberUnitList).length > 0){
      this.div2=true;
      this.memberHOmeDive=false;
      this.div1=false;

     }
     else {
      // alert("No value found....");
       this.nodataFound='block';
     }
  
 

 },
 error => {
           alert('Network issue please try again');
 }
);
}


      chooseTreeName(){
      this.treeList='';
      this.userService.loadTreeName() 
      .subscribe(
      data => {
      // alert(data);
        this.treeList = data;
        console.log("Tree Name--->"+this.treeList[1]);

        console.log("statusOfPrivateTree List Size-------------->"+Object.keys(this.treeList).length);
        this.div1= true;
        this.div2=false;
        this.memberHOmeDive=false;

      },
      error => {
              alert('Network issue please try again');
      }
      );

      }
      statusOfPrivateTree(){
      //  alert("statusOfPrivateTree............"+this.model.treeName);
        this.memberUnitList="";
        var primaryKey = localStorage.getItem("userloginPrimaryKeyString");
        this.userService.getSinglePrivateUnitInfo(primaryKey,this.model.treeName) 
        .subscribe(
          data => {
          this.memberUnitList = data;
          console.log("statusOfPrivateTree List Size-------------->"+Object.keys(this.memberUnitList).length);
          if(Object.keys(this.memberUnitList).length > 0){
            this.memberHOmeDive=false;
            this.div1=false;
            this.div2=true;
          }
          else {
            this.nodataFound='block';

          }
        },
        error => {
                  alert('Network issue please try again');
        }
      );
      }
      
  backToMyStatus(){
    this.memberHOmeDive=true;
    this.div2=false;
    this.div1=false;
    this.nodataFound = 'none';

  }

}
