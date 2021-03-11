import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {

  constructor(private userSer: UserService, private acrt: ActivatedRoute) {
                 this.GetProducts();
   }

  ngOnInit() {
  }

//get product details based on wishlist
ProductData: object;
Img;
GetProducts(){
  this.userSer.serGetProductsBasedOnWishlist().subscribe((dt: any)=>{
       this.ProductData = dt;
       //alert(this.ProductData)
  })
}

//addtocart through wish list code







}
