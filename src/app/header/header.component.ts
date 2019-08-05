import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imgsrc: string;

  constructor() { }

  ngOnInit() {
    this.imgsrc="assets/images/logo.jpg";

  }

}
