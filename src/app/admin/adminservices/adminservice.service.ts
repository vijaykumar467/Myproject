import { Injectable } from '@angular/core';
import { Settings } from 'src/app/settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  objsetting: Settings;

  constructor(private http: HttpClient) {
     this.objsetting = new Settings();
   }
//category update
serUpdateCat(obj){
 var URLcat = this.objsetting.serverUrl+"/CatPath/CatUpdate";
 return this.http.post(URLcat, obj);
}

//subcategory Update
serUpdatesubcat(ob){
  var URLsubcat = this.objsetting.serverUrl+"/SubcatPath/SubcatUpdate";
  return this.http.post(URLsubcat, ob);
}

//Subsubcategory Update
serUpdatesubsubcat(obj1){
  var URLsubsubcat = this.objsetting.serverUrl+"/SubsubPath/Subsubcat";
  return this.http.post(URLsubsubcat, obj1);
}

//brand update function
 serUpdateBrand(abc){
     var URL11 = this.objsetting.serverUrl+"/BrandPath/BrandUpdate";
     return this.http.post(URL11, abc);
 }





}
