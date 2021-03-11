import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconModule, MatRadioButton, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercommonComponent } from './usercommon/usercommon.component';
import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './header/header.component';
import { UserproductsComponent } from './userproducts/userproducts.component';
import { ProductdetialsComponent } from './productdetials/productdetials.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CarouselComponent } from './carousel/carousel.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { HomeComponent } from './home/home.component';
import { AddsComponent } from './adds/adds.component';
import { OldproductsComponent } from './oldproducts/oldproducts.component';
import { FooterComponent } from './footer/footer.component';
import { ActivateComponent } from './activate/activate.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { PaymentreceiptComponent } from './paymentreceipt/paymentreceipt.component';
import { CategorisdetailsComponent } from './categorisdetails/categorisdetails.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { SearchproductsComponent } from './searchproducts/searchproducts.component';
import { OrderproductsComponent } from './orderproducts/orderproducts.component';

import {ImageZoomModule} from 'angular2-image-zoom';
import {Ng5SliderModule} from 'ng5-slider';



@NgModule({
  declarations: [UsercommonComponent, HeaderComponent, UserproductsComponent, ProductdetialsComponent,
    CartComponent, CarouselComponent, UpcomingComponent, HomeComponent, AddsComponent,
     OldproductsComponent, FooterComponent, ActivateComponent, PaymentgatewayComponent,
     PaymentreceiptComponent, CategorisdetailsComponent, UserprofileComponent, WhishlistComponent,
     SearchproductsComponent, OrderproductsComponent],
  imports: [
    Ng5SliderModule,
    MatRadioModule,
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule,ImageZoomModule
  ],
  providers: [HeaderComponent, ProductdetialsComponent]
})
export class UserModule { }
