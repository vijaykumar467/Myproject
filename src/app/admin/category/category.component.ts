import { AdminserviceService } from './../adminservices/adminservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import {AllCommunityModules} from "@ag-grid-community/all-modules";
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';

@Component({ 
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

    category:object;
    textsearch;
    ord:boolean=true;

 //insert
    catname:string;

//edit
    tempid:number = 0;
    txtcat:string;
    drpdStatus: string;

//validations
catForm: FormGroup;
submitted = false;

constructor(private comser: CommonService, private formBuilder: FormBuilder, private seradmin: AdminserviceService) {
       this.Retrieve();
   }

  ngOnInit() {
    this.catForm = this.formBuilder.group({
        categoryname: [" ", Validators.required],
    })

  }

  get f(){
    return this.catForm.controls;
  }

  //category insert
   Insert(){
      this.submitted = true;
     if(this.catForm.invalid){
         return;
     }
     else{

     var obj = {CategoryName:this.catname, Status:"1"};
     this.comser.serInsert(obj).subscribe((dt:any)=>{
       if(dt.resp == 0){
          this.comser.modalemitter.emit({resp:"Category Not Added"})
       }
       else{
           this.comser.sercatSetter().subscribe(dt=>{
              this.category = dt;
              this.comser.modalemitter.emit({resp:"Category Added"})
              //alert('Category Item Added');
                this.Retrieve();
                this.catname="";

           })
       }
     })
   }
  }

  cols=[
    {field:"CategoryName",sortable:true,checkboxSelection:true, filter: true},
    {field:"Status"},
    {field: "Operations",}
  ]
   mod = AllCommunityModules;


//category data get
Retrieve(){
   this.comser.sercatGetter().subscribe((dt:any) => {
       this.category = dt;
        if(this.category == null){
            this.comser.sercatSetter().subscribe((dt: any) =>{
                 this.category = dt;
            })
        }
   })
}


//category Update functions
functionedit(category) { 
    this.tempid = category._id;
    this.txtcat = category.CategoryName;
    this.drpdStatus = category.status;

  }

 catUpdate(){
   var obj = [{_id: this.tempid}, {CategoryName: this.txtcat, Status:this.drpdStatus}]
   this.seradmin.serUpdateCat(obj).subscribe(dt=>{
        this.tempid = 0;
        this.comser.modalemitter.emit(dt);
        this.comser.Catdata = null;
        this.Retrieve();
   })
 }

 


}

