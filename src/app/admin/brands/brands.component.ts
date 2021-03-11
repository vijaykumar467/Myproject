import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminserviceService } from '../adminservices/adminservice.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

    brand:object;
    textsearch;
    ord:boolean=true;

//validations
brandForm: FormGroup;
submitted = false;
get f(){
  return this.brandForm.controls;
}

  constructor(private comser: CommonService, private formBuilder: FormBuilder, private seradmin: AdminserviceService) {
          this.brandGet();
   }

  ngOnInit() {
        this.brandForm = this.formBuilder.group({
          brandname : [" ", Validators.required]
        })
    }

//insert fields names
brandName: string;
Insert(){
  this.submitted = true;
  if(this.brandForm.invalid){
      return;
  }
  else{
   var obj= {
               BrandName: this.brandName,
               Status: "1"
            }
          this.comser.serBrandInsert(obj).subscribe((dt:any)=>{
               if(dt.resp == 0){
                 this.comser.modalemitter.emit({resp: 'Brand Item Not Added'})
               }
              else{
                this.comser.serBrandSetter().subscribe(dt=>{
                  this.brand = dt;
                  this.comser.modalemitter.emit({resp: 'Brand Item Added'});
                  this.brandName = '';

                })
               }
          })
    }
}

//data getting function
brandGet(){
  this.comser.serBrandGetter().subscribe(dt=>{
     this.brand = dt;
     if(this.brand == null){
        this.comser.serBrandSetter().subscribe(dt=>{
             this.brand = dt;
        })
     }
  })
}

//input field names
brandid:number = 0;
editBrandName : string;
editStatus: string;
edit(data){
  this.brandid = data._id,
  this.editBrandName = data.BrandName,
  this.editStatus = data.Status
}

//update function
update(){
    var obj = [
      {_id: this.brandid},
      {BrandName: this.editBrandName, Status: this.editStatus}
    ]
    this.seradmin.serUpdateBrand(obj).subscribe(dt=>{
        this.brandid = 0;
        this.comser.BrandGet = null;
        this.brandGet();
        this.comser.modalemitter.emit({resp: "Brand Item Updated"})
    })
}


}
