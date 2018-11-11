import { Component, OnInit, ViewEncapsulation } from '@angular/core';
 
@Component({
  selector: 'home-component',
  templateUrl : './home.component.html',
  styles:[`#body {height: 90vh;}`],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit() {}  

}