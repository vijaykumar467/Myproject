import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import  decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleadminService implements CanActivate { 

  constructor(private rt:Router) {

   }

  RoleData: string;

canActivate(rtobj:ActivatedRouteSnapshot){
    if(localStorage.getItem('token')){
       var tknobj = decode(localStorage.getItem('token'))
        this.RoleData = tknobj.userrole;
     // alert(tknobj.userrole)
      //alert(rtobj.data.role)
       if(tknobj.userrole === rtobj.data.role || tknobj.userrole == "superadmin" || rtobj.data.role == "CommonRole"){

            return true;
       } 
       else{

             this.rt.navigateByUrl('admin/unat')
         }
     }

    else
    {
      this.rt.navigateByUrl('admin/login')
      return false;
    }

  }


}

