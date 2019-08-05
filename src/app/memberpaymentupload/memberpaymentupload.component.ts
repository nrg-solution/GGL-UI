import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AuthenticationService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService,AlertService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector: 'app-memberpaymentupload',
  templateUrl: './memberpaymentupload.component.html',
  styleUrls: ['./memberpaymentupload.component.css']
})
export class MemberpaymentuploadComponent implements OnInit {
  imgsrc:string;
  selectedFiles: FileList;
  currentFileUpload: File;
  memberID: string;
  model: any = {};

  success = 'none';
  user:User;
  progress: { percentage: number } = { percentage: 0 };

  constructor(    
    private uploadService: AuthenticationService , 
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  selectFile(event:any) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.uploadService.getMemberIDValidate(this.model.memberID)
    .subscribe(
      memberResponse => {
        this.user = memberResponse;
        console.log("Response message -------------------->", this.user.status); 
        if(this.user.status=="Valid"){

            console.log('memberID -->'+this.model.memberID);
        
            this.progress.percentage = 0;
            this.memberID = this.model.memberID;
            this.currentFileUpload = this.selectedFiles.item(0);
            this.uploadService.pushFileToStorage(this.currentFileUpload,this.memberID).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {       
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
                console.log('---------Inside If--------------');

              } else if (event instanceof HttpResponse) {
                console.log('File is completely uploaded!'+event.status);
                if(event.status==200){
                  this.success ='block';
                }else if(event.status==417){
                  console.log('--------- Not Uploaded --------------');
                }
                this.router.navigate(['/memberpaymentupload']);
              }
            });
            this.selectedFiles = undefined;
              
        } 
        if(this.user.status=="InValid"){
            this.alertService.success('Member ID is not Valid.');
        }                    
      },
      error => {
        alert('Network issue please try again');
      }); 
  }

  onCloseHandled(){
    this.success = 'none';
    window.location.reload();
  }

}
