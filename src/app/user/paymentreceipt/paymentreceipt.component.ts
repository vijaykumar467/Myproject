import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paymentreceipt',
  templateUrl: './paymentreceipt.component.html',
  styleUrls: ['./paymentreceipt.component.css']
})
export class PaymentreceiptComponent implements OnInit {
  Status_temp: boolean;
  request_id: any;

  constructor(private userSer: UserService,public ht:HttpClient) {

    var PaymentUrl = document.URL
    //alert(PaymentUrl)
    var URL = PaymentUrl.split('?')
    //alert(URL)
    var Array = URL[1].split('&')
    //alert(Array[1])
    var Pay_Status = Array[1].split('=')
   // alert(Pay_Status)
    if(Pay_Status[1] == "Credit"){
       this.Status_temp = true;
       this.request_id = Array[2].split('=');
       //alert(this.request_id)
       this.userSer.serPassingDbCartItemsToTable(this.request_id[1]).subscribe(dt=>{

})
var smsmessage=`Your order is success products will deliver soon...OrderId:${this.request_id} Thank you`
var str="http://www.onlinebulksmslogin.com/spanelv2/api.php?username=NalaxIt&password=nalaxit@123&to=8099286518&from=NALAXI&message="+smsmessage
 // this.ht.get(str).subscribe()


    }
    else 
    {
      this.Status_temp = false;
    }



   }

  ngOnInit() {
  }



}
