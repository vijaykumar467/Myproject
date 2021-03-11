import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CartincreaseService } from '../cartincrease.service';
import { fromEvent } from 'rxjs';
import decode from "jwt-decode"
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   CATDATA: object;
   SUBCATDATA:object;
   SUBSUBCATDATA:object
   textmodal: string;
   tkn

  constructor(private route: Router, private comser: CommonService, private formBuilder: FormBuilder,
    private userSer: UserService, private cartInc: CartincreaseService) {

      if(localStorage.getItem("UserToken"))
      this.tkn=decode(localStorage.getItem("UserToken"))
      console.log(this.tkn)
       this.GetDbCartData();
       //login popup for wishlist code
       this.userSer.loginEmitter.subscribe(()=>{
           this.ModalPopup1();
       })
//login user name
   this.LoginUserName;

      this.AddItemToCart();
 //common modal alert popup function
  this.userSer.modalemitter.subscribe(dt=>{
     this.textmodal = dt.resp;
     this.FunAlert();
  })

    // this.CATDATA = this.comser.Catdata;
      this.comser.sercatGetter().subscribe(dt=>{
         this.CATDATA = dt;
         if(dt == null){
           this.comser.sercatSetter().subscribe(dt=>{
               this.CATDATA = dt;
           })
         }
      })

      //subcat data
      this.comser.serSubcatGetter().subscribe(dt=>{
        this.SUBCATDATA = dt;
        if(dt == null){
          this.comser.serSubcatSetter().subscribe(dt=>{
              this.SUBCATDATA = dt;
          })
        }
     })

     //subsubcatdata

     this.comser.serSubsubcatGetter().subscribe(dt=>{
        this.SUBSUBCATDATA = dt;
        if(dt == null){
           this.comser.serSubsubcatSetter().subscribe(dt=>{
               this.SUBSUBCATDATA = dt;
           })
        }
     })

   }

//user Login validations
loginForm: FormGroup;
submitted = false;
get f() { return this.loginForm.controls; }

//user register validations
registerForm: FormGroup;
submitted1 = false;
get rf(){ return this.registerForm.controls; }


SearchProducts: object
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
        });

     this.registerForm = this.formBuilder.group({
              name: [" ", Validators.required],
              email: [" ", Validators.required],
              password1: [" ", Validators.required],
              phone: [" ", Validators.required],
              address: [" ", Validators.required],
              gender: [" ", Validators.required]

     })

//search the product code

   var con=<HTMLInputElement>document.getElementById("txtsea")
    fromEvent(con,"keyup").subscribe((dt:KeyboardEvent)=>{
      if(dt.keyCode == 13)
      {
        this.userSer.serGetSearchData({txt:this.txtsearch}).subscribe((dt:any)=>{
              //alert(dt)
              this.SearchProducts = dt;
              //passing search data to search component through ref variable
              this.userSer.SearchProductsData = this.SearchProducts;
              //alert(this.userSer.SearchProductsData)
              this.route.navigateByUrl('/user/searchproducts');
        })
      }
    })
}

//login form Login function

Login(){
  this.submitted = true;
  if(this.loginForm.invalid){
      return;
  }

}

//user register variable
txtname: string;
txtemail: string;
txtpwd: string;
txtphn: string;
txtaddress: string;
gender: string;
UserData: object
Register(){
  this.submitted1 = true;
  if(this.registerForm.invalid){
     return;
  }
  else
  {
     var obj = {
           UserName: this.txtname,
           Email: this.txtemail,
           Password: this.txtpwd,
           Mobile: this.txtphn,
           Address: this.txtaddress,
           Gender: this.gender
     }
     this.userSer.serUserRegister(obj).subscribe((dt: any)=>{
          this.UserData = dt;
            this.userSer.modalemitter.emit({resp: "Registration success..!"})
            //alert('Registration success..!')
              this.txtname='',
              this.txtemail='',
              this.txtpwd='',
              this.txtphn='',
              this.txtaddress='',
              this.gender=''
     })
  }

}

//user login function code
logintxt: string;
loginpwd: string;
LoginUserName: string
UserLogin(){
  //alert('hiii')
  this.submitted = true;
  if(this.loginForm.invalid)
  {
     return;
  }
  else{
  var obj = {
     UserName: this.logintxt,
     Password: this.loginpwd
  }
  this.userSer.serUserLogin(obj).subscribe((dt: any)=>{
      var actlnk = this.userSer.Act_Link
      //alert(actlnk)
      this.LoginUserName = this.userSer.User_Nmae
     // alert(this.LoginUserName)
    if(actlnk == 1){
      if(dt.resp == 0){
        this.userSer.modalemitter.emit({resp: "Invalid Credentials"})
      }
      else{
        localStorage.setItem('UserToken', dt.resp)
       // this.userSer.modalemitter.emit({resp: "Login Success..!"})
        this.ModalPopupClose();
        var CartArray = [];
        if(localStorage.getItem('prodcart'))
        {
          var CartData = localStorage.getItem('prodcart')
          var Array = CartData.split('&&');
          for(var i=0; i<Array.length; i++)
          {
              var abc = JSON.parse(Array[i]);
              abc.UserId = this.userSer.user_id;
              CartArray.push(abc)
          }
        //  alert(CartArray)
        this.userSer.serCartDataToDb(CartArray).subscribe(()=>{
          localStorage.removeItem('prodcart');
               this.GetDbCartData();
          })

        }
        //this.route.navigateByUrl('user/home')
      }
  }
  else{
     //alert('not activated')
     this.userSer.modalemitter.emit({resp: "Your Mail-id is Not Activated..!"})
    }
  })
 }
}


//get database cart items data code
DbCartData : any;
GetDbCartData(){
  //var uid = this.userSer.user_id;
        //alert(uid)
        this.DbCartData = [];

      this.userSer.serGetDBCartItems().subscribe((dt:any)=>{
        this.DbCartData = dt;
   })
}

ModalPopupClose(){
  $("#popup1").modal("hide");
}

//modal popup
 ModalPopup1(){
   $("#popup1").modal("show");
 }


//register modal popup
ModalPopup2(){
  $("#popup2").modal("show");
}



//modalpopup alert code function

FunAlert(){
  $("#UserModal").modal('show');
}

//user logout functions
Loggedin(){
  return localStorage.getItem('UserToken');
}

UserLogout(){
  localStorage.removeItem('UserToken');
  //this.route.navigateByUrl('user/home')
}


//cart item adding code
cart_items:number = 0;
AddItemToCart(){
  this.cartInc.currentValue.subscribe(dt=>{
    this.cart_items = parseInt(dt);
  })
}


//user menu code
myFunction(e) {
  document.getElementById("myDropdown").style.display="block";
  var con2=document.getElementById("divsearch")
  con2.style.display="none"
}

// Close the dropdown if the user clicks outside of it
onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


//serch the products in home page code
txtsearch:string;
searchdata:object;
funsearch(){
  if(this.txtsearch.length==0)
  {
    $("#divsearch").css("display","none")

  }
  else
  {

    $("#divsearch").css("display","block")
    this.userSer.serGetSearchData({txt:this.txtsearch}).subscribe(dt=>{
      this.searchdata=dt;
    })
  }
}






}
