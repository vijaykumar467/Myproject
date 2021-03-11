import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmincommonComponent } from './admincommon/admincommon.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RoleadminService } from '../guards/roleadmin.service';
import { ReportsComponent } from './reports/reports.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { LogoutComponent } from './logout/logout.component';
import { WelcomeadminComponent } from './welcomeadmin/welcomeadmin.component';
import { AddcolorsComponent } from './addcolors/addcolors.component';
import { BusinessComponent } from './business/business.component';
 

const routes: Routes = [
  {path: '', component: AdmincommonComponent, children: [
    
           {path: 'category', component: CategoryComponent, canActivate: [RoleadminService], data:{role:'superadmin'}},
           {path: 'subcategory', component: SubcategoryComponent, canActivate: [RoleadminService], data:{role:'superadmin'}},
           {path: 'subsubcategory', component: SubsubcategoryComponent, canActivate: [RoleadminService], data:{role:'superadmin'}},
           {path: 'products', component: ProductsComponent, canActivate: [RoleadminService], data:{role:'manager'}},
           {path: 'brands', component: BrandsComponent, canActivate: [RoleadminService], data:{role:'manager'}},
           {path: 'addcolors', component: AddcolorsComponent, canActivate: [RoleadminService], data:{role:'manager'}},
           {path: 'business', component: BusinessComponent, canActivate: [RoleadminService], data:{role:'manager'}},
           {path: 'reports', component: ReportsComponent, canActivate: [RoleadminService], data:{role:'admin'}},
           {path: 'orderstatus', component: OrderstatusComponent, canActivate: [RoleadminService], data:{role:'admin'}},
           {path: 'login', component: LoginComponent},
           {path: 'welcome', component: WelcomeadminComponent, canActivate: [RoleadminService], data: {role: "CommonRole"}},
           {path: 'unat', component: UnauthorizedComponent}

       ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AdminRoutingModule { }
