import { Injectable } from '@angular/core';
import * as x from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartincreaseService {
     BeSub = new x.BehaviorSubject('0')
     currentValue;
  constructor() {
     this.currentValue = this.BeSub.asObservable();
     if(localStorage.getItem('prodcart')){
         var array = localStorage.getItem('prodcart').split('&&');
         this.FunNext(array.length)
     }
   }

FunNext(val){
  this.BeSub.next(val)
}


}
