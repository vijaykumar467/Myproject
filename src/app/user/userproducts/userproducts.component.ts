import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-userproducts',
  templateUrl: './userproducts.component.html',
  styleUrls: ['./userproducts.component.css']
})
export class UserproductsComponent implements OnInit {

ProductData: object;
SubsubCatId: string;
EmptyProduct: any;
/////////////


rangeSliderMinValue: number = 100;
rangeSliderMaxValue: number = 10000;
rangeSliderOptions: Options = {
  floor: 100,
  ceil: 100000,
  step:50,

}

///////////////

funGetBasedonRange(){
  this.userSer.serUserGetproducts({ssid: this.SubsubCatId,min:this.rangeSliderMinValue,max:this.rangeSliderMaxValue}).subscribe(dt=>{
    this.ProductData = dt;
 })
}

  constructor(private actrt: ActivatedRoute, private userSer: UserService) {

       this.actrt.params.subscribe(dt=>{
           this.SubsubCatId = dt.SubsubId;
           userSer.serUserGetproducts({ssid: this.SubsubCatId}).subscribe((dt:any)=>{
             if(dt.length == 0)
             {
                 this.EmptyProduct = dt;
             }
             else
             {
               this.ProductData = dt;
             }

           })
       })
   }


  ngOnInit() {
  }




}
