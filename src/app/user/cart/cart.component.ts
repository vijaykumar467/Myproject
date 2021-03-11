import { Component, OnInit } from '@angular/core';
import { CartincreaseService } from '../cartincrease.service';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartData: any = [];
Grand_Total=0;
selectclr: string;
constructor(private route: Router, private cartInc: CartincreaseService, private header: HeaderComponent, private userSer: UserService, private acrt: ActivatedRoute) {
      if(localStorage.getItem('prodcart')){
        this.GetCartStorageData();
      }
      else if(localStorage.getItem('UserToken')){
        this.GetDbCartData();
      }

      this.CartDecrement();
      this.AddItemToCart();

}

//cart empty code
CartEmpty: any;



//get localstorage cart item data code
GetCartStorageData(){
  this.cartData = [];
  this.Grand_Total=0

  var data = localStorage.getItem("prodcart").split("&&");

  for(var i=0; i<data.length; i++){
     var ab = JSON.parse(data[i])
       // this.cartData.push(JSON.parse(data[i]))
       var Each_Product_Total = ab.selquantity*ab.newprice
       ab.TotalPrice = Each_Product_Total;
       this.cartData.push(ab);
     }
     this.funUpdateCart()
     this.funtotamount()
}
funtotamount(){
  this.Grand_Total=0
  for(var i=0;i<this.cartData.length;i++)
  {
    var Each_Product_Total=this.cartData[i].selquantity*this.cartData[i].newprice
  this.Grand_Total+= Each_Product_Total;
  }

}
funUpdateCart(){
this.cartInc.FunNext(this.cartData.length)
}


//cart item delete function
DeleteCartItem(PID){
  // alert(PID)
  var alert = confirm("Are you confirm to delete cart");
  if( alert == true){
  var string=""
  for(var i=0; i<this.cartData.length; i++)
  {
     if(this.cartData[i].pid!=PID)
     {
        string+= JSON.stringify(this.cartData[i])
        string+= "&&";
     }
  }
  string = string.substr(0, string.length-2)
  localStorage.setItem("prodcart", string)
  this.cart_tot_dec--;
  this.cartInc.FunNext(this.cart_tot_dec);
  this.GetCartStorageData();
  //alert(string)
  }
  else{

   }
}

//cart items decremet function code
cart_tot_dec:number;
CartDecrement(){
   this.cartInc.currentValue.subscribe(dt=>{
      this.cart_tot_dec = parseInt(dt);

   })
}

//cart item adding code
cart_items:number = 0;
AddItemToCart(){
  this.cartInc.currentValue.subscribe(dt=>{
    this.cart_items = parseInt(dt);
  })
}

  ngOnInit() {
  }
//cart items quantity inc & dec & total & grnd total function logic

IncrementItem(index1, tqty, proid)
  {
    var Text="txt"+index1
    var Text_Box=<HTMLInputElement>document.getElementById(Text)
    var cur_val:any=parseInt(Text_Box.value)
    if(cur_val<tqty)
    {
    cur_val=cur_val+1
    Text_Box.value=cur_val
    this.QuantityUpdate(cur_val,proid)

    }
  }

DecrementItem(index1, proid)
  {
    var Text="txt"+index1
    var Text_box=<HTMLInputElement>document.getElementById(Text)
    var cur_val:any=parseInt(Text_box.value)
    if(cur_val>1)
    {
    cur_val=cur_val-1
    Text_box.value=cur_val
    this.QuantityUpdate(cur_val,proid)
    }
  }

//store the update quantity in local stoirage function

QuantityUpdate(cv, proid){
  this.Grand_Total=0
  var string=""
  if(localStorage.getItem('prodcart'))
  {
  for(var i=0;i<this.cartData.length;i++)
  {
    if(this.cartData[i].pid==proid)
    {
      this.cartData[i].selquantity=cv
      this.cartData[i].TotalPrice=this.cartData[i].newprice*cv
    }
    var ToT=this.cartData[i].newprice*this.cartData[i].selquantity
    this.Grand_Total+=ToT
    string+=JSON.stringify(this.cartData[i])
    string+="&&"
  }
  string=string.substr(0, string.length-2)
  localStorage.setItem("prodcart",string)
  this.funtotamount()
 }else{

      //alert('logged in')
      this.userSer.serUpdatDbCartItems({count: cv, pid: proid}).subscribe(dt=>{
        this.GetDbCartData()
        this.funtotamount()
    })

 }

}


//data base cart operations start

//get database cart items data code
GetDbCartData(){
  //var uid = this.userSer.user_id;
        //alert(uid)
        this.cartData = [];
      this.userSer.serGetDBCartItems().subscribe((dt:any)=>{
        if(dt.length == 0){
           this.CartEmpty = dt;
        }
        else{
          this.cartData = dt;
          for(var i=0;i<this.cartData.length;i++)
          {
            var Each_Product_Total = this.cartData[i].selquantity*this.cartData[i].newprice
            this.cartData[i].TotalPrice = Each_Product_Total;

          }
          this.funUpdateCart()
          this.funtotamount()
        }

   })
}

//delete db cart data code

DeleteBdCartItem(uid){
    //alert(uid)
    this.userSer.serDeleteBDCartItem({_id: uid}).subscribe((dt:any)=>{
         //alert(dt.resp)
         this.userSer.modalemitter.emit({resp: "Db Item Deleted...!"})
         this.cart_tot_dec--;
         this.cartInc.FunNext(this.cart_tot_dec);
         this.GetDbCartData();

    })
}

//updateing the database cart items code





//continue shoping button popup code
ContinuePopUp(){
    this.header.ModalPopup1();
    this.route.navigateByUrl('/payment');
}


UserLoggedIn(){
   return localStorage.getItem('UserToken')
}





}
