import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { User } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-member-withdraw',
  templateUrl: './member-withdraw.component.html',
  styleUrls: ['./member-withdraw.component.css']
})
export class MemberWithdrawComponent implements OnInit {
  model: any = {};
  user:User;
  loading = false;

  imgsrc: string;
  successdialog='none'; 
  failuredialog='none'; 
  exsistdialog='none';

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
          this.model.memberOvrriding = this.user.memberOvrriding;
          this.model.memberCommition = this.user.memberCommition;
          this.model.totalAmount = this.user.totalAmount;
      },
      error => {
          alert('Network issue please try again');
      }
    );  
  }

  memberWithdraw(){
    this.model.memberID = this.user.memberID;
    this.loading = true;
    this.userService.submitWithdraw(this.model)
      .subscribe(
        data => { 
            this.user =   data;   
            if(this.user.status=="success"){
              this.loading = false;
              this.successdialog ="block";
            }    
            else if(this.user.status=="failure"){   
              this.loading = false;
              this.failuredialog ="block";
            }    
            
            else if(this.user.status=="exsist"){   
              this.loading = false;
              this.exsistdialog ="block";
            }    
                  
        },
        error => {
            this.loading = false;
            this.alertService.error('Network issue please try again');
       }
    );
  }

  onCloseHandled(){
    this.successdialog='none'; 
    this.failuredialog='none'; 
    this.exsistdialog='none'; 
  }

}
