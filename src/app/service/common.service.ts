import { Injectable } from '@angular/core';
import { Settings } from '../settings';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import {map} from "rxjs/operators"
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  objSetting:Settings;

 //modal service
 modalemitter = new EventEmitter();

//getter and setter
 Catdata:object = null;
SubcatData:object = null;
SubsubcatData:object = null;

  constructor(private http: HttpClient) {
     this.objSetting = new Settings();

     this.sercatSetter();
     this.serSubcatSetter();
     this.serSubsubcatSetter();
     this.serBrandSetter();
   }
//category insert
 serInsert(obj){
            var URL1 = this.objSetting.serverUrl+'/CatPath/CatInsert';
            return this.http.post(URL1, obj);
       }

 //category getter and setter functions start
 sercatGetter(){
    //alert("getter ex..")
    return of(this.Catdata);
 }

sercatSetter(){

          var URL2 = this.objSetting.serverUrl+'/CatPath/CatGet';
          return this.http.get(URL2).pipe(map(dt=>{
               return this.Catdata = dt;
          }))
     }
//category getter and setter functions end


//Subcategory insert operation
serSubinsert(obj){
      var SubcatURL1 = this.objSetting.serverUrl+'/SubcatPath/SubcatInsert';
        return this.http.post(SubcatURL1, obj);
     }


//subcategory getter and setter functions start

serSubcatGetter(){
  // alert("Subcat getter exe..")
   return of(this.SubcatData);
}

serSubcatSetter(){
  var SubcatURL2 = this.objSetting.serverUrl+'/SubcatPath/SubcatGet';
   return this.http.get(SubcatURL2).pipe(map(dt=>{
        return this.SubcatData = dt;
   }))
}
//subcategory getter and setter functions end


//Subsubcategory insert operation
  serSubsubinsert(abc){
    var subsubURL1 = this.objSetting.serverUrl+'/SubsubPath/SubsubInsert';
    return this.http.post(subsubURL1, abc);
  }

//subcategory getter and setter functions start
 serSubsubcatGetter(){
   //alert("Subsub Getter exe...");
   return of(this.SubsubcatData);
 }

 serSubsubcatSetter(){
   var subsubURL2 = this.objSetting.serverUrl+'/SubsubPath/Subsubget';
   return this.http.get(subsubURL2).pipe(map(dt=>{
        return this.SubsubcatData = dt;
   }))
 }
//subcategory getter and setter functions end



//brands insertfunction
 serBrandInsert(abc){
     var BrandURL = this.objSetting.serverUrl+"/BrandPath/BrandInsert";
      return this.http.post(BrandURL, abc);
 }

//brand setter and getter functions start
 BrandGet: object = null;

  serBrandGetter(){
    //alert("Brand exe..")
    return of(this.BrandGet)
  }

  serBrandSetter(){
     var BURL = this.objSetting.serverUrl+"/BrandPath/Brandget";
      return this.http.get(BURL).pipe(map(dt=>{
         return this.BrandGet = dt;
      }))
  }

//brand setter and getter functions end

//product insert
serProductInsert(obj){
  var ProductURL = this.objSetting.serverUrl+"/ProductPath/ProductInsert";
  return this.http.post(ProductURL, obj);

 }
//product getter and setter start
ProductGet: object = null;
serProductGetter(){
  return of(this.ProductGet);
}

serProductSetter(){
  var prdURL1 = this.objSetting.serverUrl+"/ProductPath/ProductGet";
   return this.http.get(prdURL1).pipe(map(dt=>{
         return this.ProductGet = dt;
   }))
}

//product getter and setter end

//adding more colors to product items code
AddMoreColors(abc){
  var ColorURL = this.objSetting.serverUrl+"/ProductPath/AddMoreColors";
  return this.http.post(ColorURL, abc)
}

//get color code from tbl_color table
serGetColorCode(){
  var GetColor = this.objSetting.serverUrl+"/ProductPath/GetColorCode";
  return this.http.get(GetColor)
}

//insert products with color and images
serInsertProductWithColorImages(abc){
    var ColorImage = this.objSetting.serverUrl+"/ProductPath/InsertProductWithColorImg";
    return this.http.post(ColorImage, abc);
}





}
