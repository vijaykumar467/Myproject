import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
declare var $: any

@Component({
  selector: 'app-oldproducts',
  templateUrl: './oldproducts.component.html',
  styleUrls: ['./oldproducts.component.css']
})
export class OldproductsComponent implements OnInit {

  constructor(private userSer: UserService) {
    this.GetOldcollectionProducts();

   }

  ngOnInit() {
  }

OldCollection: object;

GetOldcollectionProducts(){
   this.userSer.serGetOldCollection().subscribe(dt=>{
        this.OldCollection = dt;
   })
}


right1(){
   $("#DivInner1").animate({left: '-2000px'}, 1000)
}

left1(){
  $("#DivInner1").animate({left: '00px'}, 1000)
}


}
