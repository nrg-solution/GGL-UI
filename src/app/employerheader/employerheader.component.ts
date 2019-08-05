import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employerheader',
  templateUrl: './employerheader.component.html',
  styleUrls: ['./employerheader.component.css']
})
export class EmployerheaderComponent implements OnInit {


  imgsrc: string;

  constructor() { }

  ngOnInit() {
    this.imgsrc="assets/images/logo.jpg";

  }

}
