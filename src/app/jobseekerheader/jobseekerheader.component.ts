import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobseekerheader',
  templateUrl: './jobseekerheader.component.html',
  styleUrls: ['./jobseekerheader.component.css']
})
export class JobseekerheaderComponent implements OnInit {

  imgsrc: string;

  constructor() { }

  ngOnInit() {
    this.imgsrc="assets/images/logo.jpg";

  }

}
