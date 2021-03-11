import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminserviceService } from '../adminservices/adminservice.service';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

    subcategory:object;
    subtextsearch;
    subord:boolean=true;

// validations
  subcatForm: FormGroup;
  submitted = false;

//catget data
 catGet:object;

  constructor(private commser: CommonService, private formBuilder: FormBuilder, private seradmin: AdminserviceService) {
          this.SubcatRetrieve();
         //this.CategoryGet();

     }
//validations
  ngOnInit() {
    this.subcatForm = this.formBuilder.group({
      subcategoryname: [" ", Validators.required],
      categoryname: [" ", Validators.required]
    })
  }

  get subf(){
      return this.subcatForm.controls;
  }


//insert fields names
  subcatname:string;
  selectedcatId : string;
  Status: string;
//insert
SubInsert(){
      this.submitted = true;
        if(this.subcatForm.invalid){
             return;
         }
            var obj = {SubcategoryName: this.subcatname, Cat_Id: this.selectedcatId, Status: "1"}
            this.commser.serSubinsert(obj).subscribe((dt:any) =>{
            if(dt.resp == 0){
            this.commser.modalemitter.emit({resp:"Subcategory Item Not Added"});
          }
          else{
             this.commser.serSubcatSetter().subscribe((dt:any) =>{
                this.subcategory = dt;
                this.commser.modalemitter.emit({resp:"Subcategory Item Added"});
                 this.SubcatRetrieve();
                 this.subcatname='';
                 this.selectedcatId="";
             })
          }
       })
  }


//Ag-grid table start//


   cols = [
       {field: "SubcategoryName", sortable: true, checkboxSelection: true, filter: true},
       {field: "CategoryName", sortable: true, checkboxSelection: true, filter: true},
       {field: "Status"}
      ]
SubcatMod = AllCommunityModules;

//Ag-grid table end//

//SubData getting
// arrnew: any = [];

  SubcatRetrieve(){ 
    this.commser.serSubcatGetter().subscribe((dt:any)=>{
       this.subcategory = dt;
       if(this.subcategory == null){
          this.commser.serSubcatSetter().subscribe((dt:any)=>{
            // for(var i = 0; i<dt.length; i++){
                //this.arrnew.push(dt[i].items)
            // }
            // this.subcategory = this.arrnew;
             this.subcategory = dt;
          })
       }
    })
//category data getting
        this.commser.Catdata = null;
        this.commser.sercatGetter().subscribe(dt=>{
        this.catGet = dt;
        if(this.catGet == null){
           this.commser.sercatSetter().subscribe(dt=>{
              this.catGet = dt;
           })
        }
     })
  }


 //edit fields names
 subtempid:number = 0;
 subtxtcat:string;
 txtcat: string;
 subdrpdStatus: string;
 cid: string;
 changedCategoryData: any;

//edit and update operations
  Subfunctionedit(subcategory) {
    this.subtempid = subcategory._id;
    this.subtxtcat = subcategory.SubcategoryName;
    this.txtcat = subcategory.Cat_Id;
    this.subdrpdStatus = subcategory.Status;
    //this.cid = subcategory.Cat_Id
  }

SubUpdate(){
        /*for(let key in this.catGet){
          if(this.catGet[key]._id == this.txtcat)
          this.changedCategoryData = this.catGet[key]
        }*/

      var Obj = [
                  {_id:this.subtempid},
                  {SubcategoryName: this.subtxtcat, Cat_Id: this.txtcat, Status:this.subdrpdStatus}
               ]
      this.seradmin.serUpdatesubcat(Obj).subscribe(dt=>{
       this.subtempid = 0;
       this.commser.SubcatData = null;
       this.commser.modalemitter.emit(dt);
       this.SubcatRetrieve();
    })
}










}
