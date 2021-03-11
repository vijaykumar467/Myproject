import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorisdetails',
  templateUrl: './categorisdetails.component.html',
  styleUrls: ['./categorisdetails.component.css']
})
export class CategorisdetailsComponent implements OnInit {

  constructor(private userSer: UserService, private acrt: ActivatedRoute) {
       this.GetProductsBasedCategory();
   }

  ngOnInit() {
  }

//getting category based products from Products components
ProductData: object;
ID: string
GetProductsBasedCategory(){
    //alert(cid)
      this.acrt.params.subscribe(dt=>{
          this.ID = dt.CID
          this.userSer.serGetProductsBasedOnCategory({cat_id: this.ID}).subscribe(dt=>{
             this.ProductData = dt;
          })
      })
 }








}



