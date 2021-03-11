import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsercommonComponent } from './usercommon/usercommon.component';
//import { HeaderComponent } from './header/header.component';
import { UserproductsComponent } from './userproducts/userproducts.component';
import { ProductdetialsComponent } from './productdetials/productdetials.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ActivateComponent } from './activate/activate.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { PaymentreceiptComponent } from './paymentreceipt/paymentreceipt.component';
import { CategorisdetailsComponent } from './categorisdetails/categorisdetails.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { SearchproductsComponent } from './searchproducts/searchproducts.component';
import { OrderproductsComponent } from './orderproducts/orderproducts.component';



const routes: Routes = [
  {path: '', component: UsercommonComponent, children:[
           // {path: 'header', component: HeaderComponent},
            {path : "", component: HomeComponent},
            {path: "home", component: HomeComponent},
            {path: 'userproducts', component: UserproductsComponent},
            {path: 'productdetails', component: ProductdetialsComponent},
            {path: 'cart', component: CartComponent},
            {path: 'activate', component: ActivateComponent},
            {path: 'payment', component:PaymentgatewayComponent},
            {path: 'paymentreceipt', component:PaymentreceiptComponent},
            {path: 'CatDetails', component: CategorisdetailsComponent},
            {path: 'userprofile', component: UserprofileComponent},
            {path: 'whishlist', component: WhishlistComponent},
            {path: 'searchproducts', component: SearchproductsComponent},
            {path: 'orderproducts', component: OrderproductsComponent}


    ]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class UserRoutingModule { }
