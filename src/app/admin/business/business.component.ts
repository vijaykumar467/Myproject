import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor() {

   }

  ngOnInit() {
  }

//date picker code
function(){
   $('#datepicker').datepicker({
     dateFormat: "mm/DDD/yy"
   });
}

//get the order products based on date code
date:string;
GetOrderProducts(){
   alert(this.date)
}




}
