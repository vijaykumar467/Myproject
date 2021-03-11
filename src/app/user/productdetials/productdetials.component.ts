
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { CommonService } from 'src/app/service/common.service';
import { CartincreaseService } from '../cartincrease.service';


@Component({
  selector: 'app-productdetials',
  templateUrl: './productdetials.component.html',
  styleUrls: ['./productdetials.component.css']
})
export class ProductdetialsComponent implements OnInit {
PRODUCT_ID: string;
ProductDetails: any;
BigImg;
starArr = [];
halfstar: boolean;
offerArr: any;
color = 'red';
colorArr = [];
sizeArray = [];

  constructor(private sercom: CommonService, private Acroute: ActivatedRoute,
    private userSer: UserService, private header: HeaderComponent,
    private route: Router, private cartInc: CartincreaseService) {

    //add to cart increase function
      this.CartIncrease();
     // this.userSer.serGetWishListData();
      //this.userSer.WishList_Arr;

    this.Acroute.params.subscribe(dt=>{
          this.PRODUCT_ID = dt.PID;

          //alert(this.PRODUCT_ID)
          //wishlist logic code
          for(var i =0; i<this.userSer.WishList_Arr.length; i++){
            if(this.PRODUCT_ID == this.userSer.WishList_Arr[i]){
                this.wishtemp = true;
                break;
            }
          }

          this.userSer.serGetProductDetails({_id: this.PRODUCT_ID}).subscribe((dt:any)=>{
               this.ProductDetails = dt;
               this.BigImg = dt[0].images[0];
               this.offerArr = dt[0].Offers.split(",");
               //color display loop logic and select color logic
              this.colorArr = dt[0].Color.split(",");
              this.selectColor = this.colorArr[0];
              //size logic and select logic
              this.sizeArray = dt[0].Size.split(",")
              this.selectSize = this.sizeArray[0];

               //rating loop logic
               for(var i = 1; i<= dt[0].ItemRating; i++){
                    this.starArr.push('');
               }
               i--;
               if(dt[0].ItemRating >= i)
                     this.halfstar = true;

           })
      })
   }


  ngOnInit() {
  }

funBuynow(){
  if(localStorage.getItem("userLogin")){
    alert("login")
  }
  else{
    this.header.ModalPopup1();
  }
}




selectColor: string;
selectSize: string;
ProductDetailsToDB: object;
//DbData:object;
addcart(){
  if(localStorage.getItem('UserToken'))
  {
    var obj1 = {
      pid: this.ProductDetails[0]._id,
      productname: this.ProductDetails[0].ProductName,
      description: this.ProductDetails[0].ItemDescryption,
      oldprice: this.ProductDetails[0].OldPrice,
      newprice: this.ProductDetails[0].NewPrice,
      selColor: this.selectColor,
      selSize: this.selectSize,
      selquantity: 1,
      totalquantity: this.ProductDetails[0].Quantity,
      image: this.ProductDetails[0].images[0],
      UserId: this.userSer.user_id,
      }

      //alert(this.userSer.user_id)
      this.userSer.serCartDataToDb(obj1).subscribe(dt=>{
             this.ProductDetailsToDB = dt;
            // alert("data added")
            this.route.navigateByUrl('user/cart');
      })
      this.cart_total++;
     this.cartInc.FunNext(this.cart_total)
  }
  else{
    var duplicateStr = " ";
    if(localStorage.getItem('prodcart'))
   duplicateStr = localStorage.getItem('prodcart')

if(duplicateStr.match(this.ProductDetails[0]._id) == null)
 {
   var obj = {
     pid: this.ProductDetails[0]._id,
     productname: this.ProductDetails[0].ProductName,
     description: this.ProductDetails[0].ItemDescryption,
     oldprice: this.ProductDetails[0].OldPrice,
     newprice: this.ProductDetails[0].NewPrice,
     selColor: this.selectColor,
     selSize: this.selectSize,
     selquantity: 1,
     totalquantity: this.ProductDetails[0].Quantity,
     image: this.ProductDetails[0].images[0],
     }

    if(localStorage.getItem("prodcart")){
      var str = localStorage.getItem("prodcart");
      str+= "&&";
      str= str+JSON.stringify(obj);
      localStorage.setItem("prodcart", str);
      this.route.navigateByUrl("user/cart")
     }
    else{
       localStorage.setItem("prodcart", JSON.stringify(obj))
       //this.userSer.modalemitter.emit({"resp" :"This Already Item Existed"})
        this.route.navigateByUrl("user/cart")
     }
     this.cart_total++;
     this.cartInc.FunNext(this.cart_total)
   }
   else{
    this.route.navigateByUrl("user/cart");
   }
 }
}
//add to cart item increase code
cart_total:number;
CartIncrease(){
   this.cartInc.currentValue.subscribe(dt=>{
        this.cart_total = parseInt(dt);
   })
}

//add or remove wishlist items
wishtemp= false;
AddOrRemoveWishList(pid){
  this.wishtemp=!this.wishtemp;
  this.userSer.serAddwishListItems(pid);
  //alert(pid)
  //this.userSer.WishList_Arr;
  //this.userSer.serGetWishListData();



}












}
