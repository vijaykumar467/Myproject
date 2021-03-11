import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
declare var $: any

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  constructor(private userSer: UserService) {
    this.GetNewcollectionProducts();

   }

  ngOnInit() {
  }

NewCollection: object;

GetNewcollectionProducts(){
   this.userSer.serGetNewcollectionProducts().subscribe(dt=>{
        this.NewCollection = dt;
   })
}


right(){
   $("#DivInner").animate({left: '-2000px'}, 1000)
}

left(){
  $("#DivInner").animate({left: '00px'}, 1000)
}



}
