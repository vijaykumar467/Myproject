import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
{path: 'user', loadChildren: './user/user.module#UserModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
