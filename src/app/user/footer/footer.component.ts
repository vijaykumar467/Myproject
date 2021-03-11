import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private comser: CommonService, private userSer: UserService) {
    this.Retrieve();
   }

  ngOnInit() {
  }
CatGetData: object

Retrieve(){
  this.comser.sercatGetter().subscribe((dt:any) => {
      this.CatGetData = dt;
       if(this.CatGetData == null){
           this.comser.sercatSetter().subscribe((dt: any) =>{
                this.CatGetData = dt;
           })
       }
  })
}





}
