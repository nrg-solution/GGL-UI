import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService,AlertService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector: 'app-investment-paymentupload',
  templateUrl: './investment-paymentupload.component.html',
  styleUrls: ['./investment-paymentupload.component.css']
})
export class InvestmentPaymentuploadComponent implements OnInit {
  public payUpload = false;
  model: any = {};

  success = 'none';
  failure = 'none';
  user:User;
  progress: { percentage: number } = { percentage: 0 };

  selectedFiles: FileList;
  currentFileUpload: File;
  invoiceNumber: string;
  treeName: string;

  constructor(
    private uploadService: AuthenticationService , 
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {     

  }

  ngOnInit() {
    this.payUpload=true;
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
    this.uploadService.getValidateTempTree(this.model.invoiceNumber,this.model.treeName)
    .subscribe(
      memberResponse => {
        this.user = memberResponse;
        console.log("Response message -------------------->", this.user.status); 
        if(this.user.status=="Valid"){
          console.log('Invoice Number -->'+this.model.invoiceNumber);
          console.log('Tree Name -->'+this.model.treeName);
          this.progress.percentage = 0;
          this.invoiceNumber = this.model.invoiceNumber;
          this.treeName = this.model.treeName;
          this.currentFileUpload = this.selectedFiles.item(0);

          this.uploadService.storeImage(this.currentFileUpload,this.invoiceNumber,this.treeName).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {       
              this.progress.percentage = Math.round(100 * event.loaded / event.total);
              console.log('---------Inside If--------------');
    
            } else if (event instanceof HttpResponse) {
              console.log('File is completely uploaded!'+event.status);
              if(event.status==200){
                this.selectedFiles=undefined;// FileList;
                this.currentFileUpload=undefined;//: File;
                this.invoiceNumber='';//: string;
                this.treeName='';//: string;
             //   this.success ='block';
                this.alertService.success
                ('Payment Upload is completed...');

               

                
              }
              else {
                this.failure ='block';
    
              }
              //this.router.navigate(['/member-payment']);
            }
            
            else if(event instanceof HttpErrorResponse){
                this.failure ='block';
    
            }
          });
          this.selectedFiles = undefined;

      } 
        if(this.user.status=="InValid"){
            this.alertService.error
            ('Invoice Number or Tree Number is not Valid.');
        }                    
      },
      error => {
        alert('Network issue please try again');
      }); 

    //  this.selectedFiles = undefined;
  }

  onCloseHandled(){
    this.success = 'none';
    this.failure = 'none';
    window.location.reload();
  }

  home(){
    this.router.navigate(['/memberhome']);
  }

}
