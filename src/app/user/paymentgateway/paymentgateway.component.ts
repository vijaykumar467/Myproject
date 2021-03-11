import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.css']
})
export class PaymentgatewayComponent implements OnInit {

  constructor(private userSer: UserService) {
      this.GetUserregisterData();
      this.GetCartDbItemsData();
  }

  ngOnInit() {
  }
PaymentProcess:any
TotalAmt: 10;
PaymentGatewayProcess(){
  this.userSer.serPaymentGateway({}).subscribe((dt:any)=>{
        //alert(dt);
        this.PaymentProcess = JSON.parse(dt.resp)
       //alert(this.PaymentProcess)
       window.location = this.PaymentProcess.payment_request.longurl
  })
}


//getting user register data from database for payment prcess
uname: string;
uemail: string;
uphone: number;
uaddress: string
Userdata: object
GetUserregisterData(){
   //var uid = this.userSer.user_id
   //alert(uid)
   this.userSer.serGetUserRegisterData().subscribe(dt=>{
           this.Userdata = dt;
           //alert(this.Userdata)
   })
}

//getting cart items database data in payment component
CartDbData: any;
 sum = 0;
GetCartDbItemsData(){
  this.userSer.serGetDBCartItems().subscribe(dt=>{
      this.CartDbData = dt;
      //alert(this.CartDbData)
      //for(var i=0; i<this.CartDbData.length; i++){
         // this.sum+= this.CartDbData[i].TotalPrice

      //}
      //alert(this.sum)

  })
}





}
