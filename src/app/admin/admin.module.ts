import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmincommonComponent } from './admincommon/admincommon.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon'; 
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ReportsComponent } from './reports/reports.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { LogoutComponent } from './logout/logout.component';
import {MatDialogModule} from '@angular/material';
import { WelcomeadminComponent } from './welcomeadmin/welcomeadmin.component';
import  {AgGridModule} from "@ag-grid-community/angular";
import { AddcolorsComponent } from './addcolors/addcolors.component';
import { BusinessComponent } from './business/business.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [AdmincommonComponent, CategoryComponent, SubcategoryComponent, SubsubcategoryComponent, ProductsComponent, BrandsComponent, LoginComponent, UnauthorizedComponent, ReportsComponent, OrderstatusComponent, LogoutComponent, WelcomeadminComponent, AddcolorsComponent, BusinessComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatSidenavModule,
    MatSelectModule,
    FormsModule,
    MaterialFileInputModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatMenuModule,
    MatIconModule,  
    NgxPaginationModule,
    Ng2SearchPipeModule,
    OrderModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])


  ]
})
export class AdminModule { }
