import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-payment',
  templateUrl: './member-payment.component.html',
  styleUrls: ['./member-payment.component.css']
})
export class MemberPaymentComponent implements OnInit {
  
  public div1 = false;
  public div2 = false;
  public div3 = true;

 
  constructor() {     
    //this.div0 = true;
    //this.div1=false;
    //alert("Constractor Mode Called...");

  }

  ngOnInit() {
   // this.div0 = true;
    //this.div1=false;
    
    //alert("Init Mode Called...");


  }


  home(){
    //alert("Online Pay..");
    this.div1=false;
    this.div2=false;
    this.div3=true;

  }


  onlinePay(){
    //alert("Online Pay..");
    this.div1=false;
    this.div2=true;
    this.div3=false;

  }

  wirePayment(){
    //alert("Online Pay..");
    this.div1=true;
    this.div2=false;
    this.div3=false;
  }

}
