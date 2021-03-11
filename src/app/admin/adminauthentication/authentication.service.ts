import { Injectable } from '@angular/core';
import { Settings } from 'src/app/settings';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
     objSetting:Settings;

  constructor(private http:HttpClient, private router:Router) {
    this.objSetting = new Settings();

  }

  serAdminLogin(ob){

    var URL = this.objSetting.serverUrl+"/adminpath/adminlogin"
    return this.http.post(URL, ob)
  }

  Loggedin(){
    return !!localStorage.getItem('token');
  }

  serAdminLogout() {
      localStorage.removeItem('token');
      // alert('Logout Success');
       this.router.navigate(['/admin/login'])
     }




}
