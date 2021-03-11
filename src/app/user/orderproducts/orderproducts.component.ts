import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-orderproducts',
  templateUrl: './orderproducts.component.html',
  styleUrls: ['./orderproducts.component.css']
})
export class OrderproductsComponent implements OnInit {
UserName: string
  constructor(private userSer: UserService) {
    this.GetOrderProducts();
     this.UserName =  this.userSer.User_Nmae;
     //alert(this.UserName)
  }

  ngOnInit() {
  }

OrderProducts: any;
Empty: any;
  GetOrderProducts(){
     this.userSer.serGetOrderProducts().subscribe((dt:any)=>{

         if(dt.length == 0){
            this.Empty = 'this is empty'
         }else{
          this.OrderProducts = dt;
          //alert(this.OrderProducts)
         }
     })
  }




CancelOrder(abc){
  //alert(abc)
  this.userSer.serCancelOrder({_id: abc}).subscribe((dt:any)=>{
        //alert('deleted')
        this.GetOrderProducts();
  })
}





}
