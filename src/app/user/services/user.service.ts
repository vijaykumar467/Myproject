import { Injectable } from '@angular/core';
import { Settings } from 'src/app/settings';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import  decode  from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  Objsetting: Settings;

  //for search products
  SearchProductsData : Object;

  modalemitter = new EventEmitter();
//login popup for wishlist
loginEmitter = new EventEmitter();

  constructor(private http: HttpClient) {
    this.Objsetting = new Settings();
    if(localStorage.getItem('UserToken')){
      var token_data = decode(localStorage.getItem('UserToken'))
      // alert(token_data)
       this.user_id = token_data.UserId
       this.serGetWishListData();
    }


 }
//getting product data into user products
serUserGetproducts(obj){
   var URLPRD = this.Objsetting.serverUrl+"/ProductPath/GetProductsBasedId";
   return this.http.post(URLPRD, obj);
}

//getting product data into product details

serGetProductDetails(abc){
  var URLDETAILS = this.Objsetting.serverUrl+ "/ProductPath/GetProductDetailById";
   return this.http.post(URLDETAILS, abc);
}


//get NewCollection products details
serGetNewcollectionProducts(){
  var NewURL = this.Objsetting.serverUrl+ "/ProductPath/GetUpcomingProducts";
  return this.http.get(NewURL)
}


//get old colletcion code
serGetOldCollection(){
  var OldURL = this.Objsetting.serverUrl+"/ProductPath/GetOldProdutcs";
  return this.http.get(OldURL)
}


//user register function code

serUserRegister(ab){
  var UserURL = this.Objsetting.serverUrl+"/UserPath/UserRegistration";
  return this.http.post(UserURL, ab)
}

//user login function code
user_id;
Act_Link
User_Nmae;
serUserLogin(ac){
  var UserLogin = this.Objsetting.serverUrl+"/UserPath/UserLogin";
  return this.http.post(UserLogin, ac).pipe(map((dt: any)=>{
         var token_data = decode(dt.resp)
        // alert(token_data)
         this.user_id = token_data.UserId
        //gamil activation link code
         this.Act_Link = token_data.ActivationLink
         //current login user name
         this.User_Nmae = token_data.UserName
        // alert(user_id)
        this.serGetWishListData();
         return dt;
  }))
}

//User activation link code
serUserActivationLink(abc){
  var LinkURL = this.Objsetting.serverUrl+"/UserPath/UserActivationConfirm";
  return this.http.post(LinkURL, abc)
}

//cart data moving into database
serCartDataToDb(obj){
  var CartDbURL = this.Objsetting.serverUrl+"/Userpath/CartDataToDb";
  return this.http.post(CartDbURL, obj);
}


//getting database cart data into frontend cart
serGetDBCartItems(){
  var DBCART = this.Objsetting.serverUrl+'/Userpath/GetCartdataToUserCart';
  return this.http.post(DBCART, {UserId: this.user_id});
}

//delete the database cart item record
serDeleteBDCartItem(abc){
   var DbCartItemURL = this.Objsetting.serverUrl+"/UserPath/DeleteDbCartItem";
   return this.http.post(DbCartItemURL, abc);
}

//update the database cart items code
serUpdatDbCartItems(obj){
  var DbUpdURL = this.Objsetting.serverUrl+"/UserPath/UpdateDbcartItems";
  return this.http.post(DbUpdURL, {UserId: this.user_id, data: obj});
}



//payment process code
serPaymentGateway(pay){
  var PaymentURL = this.Objsetting.serverUrl+"/PaymentPath/PaymentMethod";
  return this.http.post(PaymentURL, pay)
}


//passing database cart items into ordered tale based on user-id
serPassingDbCartItemsToTable(oid){
  var Pay_URL = this.Objsetting.serverUrl+"/PaymentPath/PaymentSuccess";
  return this.http.post(Pay_URL, {UserId: this.user_id, orderid: oid})

}

//getting products based on category name
serGetProductsBasedOnCategory(abi){
   var Get_Category = this.Objsetting.serverUrl+"/ProductPath/GetProductsBasedOnCategory";
   return this.http.post(Get_Category, abi);

 }


//adding the cart items into wishlist code
serAddwishListItems(pid){
   //alert(pid)
   //alert(this.user_id)
   if(localStorage.getItem('UserToken')){
       //alert('yes')
       var obj = {
        pid: pid,
        uid: this.user_id
      }
      var wishURL = this.Objsetting.serverUrl+"/WishlistPath/AddCartItemsToWhishList";
      return this.http.post(wishURL, obj).subscribe((dt)=>{
         //alert(dt)
         this.serGetWishListData();
      })
   }
   else
   {
     //alert('no')
     this.loginEmitter.emit();
   }

}

//get the wish list data for checking
WishList_Arr = [];
serGetWishListData(){
   var obj = { uid : this.user_id}
    var GetURL = this.Objsetting.serverUrl+"/WishlistPath/GetWishListdata";
    this.http.post(GetURL, obj).subscribe((dt: any)=>{
       //alert(dt)
        this.WishList_Arr = []
        for(var i=0; i<dt.length; i++){
           this.WishList_Arr.push(dt[i].pid)
        }
        //alert(this.WishList_Arr)
    })
}

//get the products based on wishlist
serGetProductsBasedOnWishlist(){
  var URLProd = this.Objsetting.serverUrl+"/WishlistPath/GetProductsBasedOnWishList";
  return this.http.get(URLProd);
}


//getting the user register data from data base
serGetUserRegisterData(){
    var obj = {uid: this.user_id}
    //alert(obj)
   var RegisterURL = this.Objsetting.serverUrl+"/UserPath/GetUserRegisterData";
   return this.http.post(RegisterURL, obj)
}


//user register data update code in user module
serUpadateUserRegisterData(abc){
  var UpdtURL = this.Objsetting.serverUrl+"/UserPath/UpdateUserRegisterData";
  return this.http.post(UpdtURL, abc);

}


//search the products from search box code
serGetSearchData(obj){
  var Get_Category = this.Objsetting.serverUrl+"/UserPath/getSearchData";
  return this.http.post(Get_Category,obj)

}

//get the order products details in order component
serGetOrderProducts(){
  var OrderURL = this.Objsetting.serverUrl+"/UserPath/GetProductsOrders";
    return this.http.post(OrderURL, {UserId : this.user_id})
}

//cancel order code
serCancelOrder(ab){
  var OrdURL = this.Objsetting.serverUrl+"/UserPath/DeleteOrder";
  return this.http.post(OrdURL, ab);
}








}


