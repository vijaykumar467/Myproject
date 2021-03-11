import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminserviceService } from '../adminservices/adminservice.service';


@Component({
  selector: 'app-subsubcategory',
  templateUrl: './subsubcategory.component.html',
  styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent implements OnInit {

    subsubcategory:object;
    subsubtextsearch;
    subsubord:boolean=true;

 //validations
  subsubcatForm: FormGroup;
  submitted = false;


  constructor(private commonser: CommonService, private formBuilder: FormBuilder, private seradmin: AdminserviceService) {
            this.SubsubcatRetrieve();
             this.SubcatgeoryGet();
  }

   ngOnInit() {
    this.subsubcatForm = this.formBuilder.group({
      subsubcategoryname: [" ", Validators.required],
      subcategoryname: [" ", Validators.required],
      categoryname: [" ", Validators.required]
      })
  }

   get subsubf(){
      return this.subsubcatForm.controls;
   }

   //insert fields names
   subsubcatname:string;
   subcatId: string;

  //insert
  SubsubInsert(){
      this.submitted = true;
       if(this.subsubcatForm.invalid){
            return;
       }
       var obj = {
                  SubsubcategoryName:this.subsubcatname,
                  Subcat_Id: this.subcatId,
                  Status:"1"
              };
          this.commonser.serSubsubinsert(obj).subscribe((dt:any)=>{
          if(dt.resp == 0){
            this.commonser.modalemitter.emit({resp:"Subsubcategory Not Item Added"});
          }
          else{
            this.commonser.serSubsubcatSetter().subscribe((dt:any)=>{
              this.subsubcategory = dt;
              this.commonser.modalemitter.emit({resp:"Subsubcategory Item Added"});
              this.SubsubcatRetrieve();
              this.subsubcatname = "";
              this.subcatId="";

            })
          }
       })
    }


//ag-grid table start

column = [
  {field: "SubsubcategoryName", sortable: true, checkboxSelection: true, filter: true},
  {field: "SubcategoryName", sortable: true, checkboxSelection: true, filter: true},
  {field: "Status"}
]
SubsubcatMod = AllCommunityModules;

//ag-grid table end

//get subcategory data
// arrnew: any= [];
  SubsubcatRetrieve(){
    this.commonser.serSubsubcatGetter().subscribe((dt:any)=>{
       this.subsubcategory = dt;
       if(this.subsubcategory == null){
          this.commonser.serSubsubcatSetter().subscribe((dt: any)=>{
             /* for(var i = 0; i<dt.length; i++){
                 this.arrnew.push(dt[i].items)
              }
              this.subsubcategory = this.arrnew; */
              this.subsubcategory = dt;
          })
       }
    })
  }
//Subcategory getting in dropdowns
SubCatGet: object;

SubcatgeoryGet(){
      this.commonser.SubcatData = null;
      this.commonser.serSubcatGetter().subscribe(dt=>{
       this.SubCatGet = dt;
       if(this.SubCatGet == null){
          this.commonser.serSubcatSetter().subscribe(dt=>{
          this.SubCatGet = dt;
       })
     }
  })
}

//edit fields names
subsubtempid:number = 0;
subsubtxtcat:string;
subtxtcat:string;
txtcat:string;
subsubdrpdStatus: string;

//Subsubcategory edit and update operation
  Subsubfunctionedit(subsubcategory) {
    this.subsubtempid = subsubcategory._id;
    this.subsubtxtcat = subsubcategory.SubsubcategoryName;
    this.subtxtcat= subsubcategory.Subcat_Id;
    this.subsubdrpdStatus = subsubcategory.Status;
  }


Update(){

  var subsubcat = [
            {_id: this.subsubtempid},
            {SubsubcategoryName: this.subsubtxtcat, Subcat_Id:this.subtxtcat, Status: this.subsubdrpdStatus}
         ]
    this.seradmin.serUpdatesubsubcat(subsubcat).subscribe(dt=>{
        this.subsubtempid = 0;
        this.commonser.SubsubcatData = null;
        this.SubsubcatRetrieve();
        this.commonser.modalemitter.emit(dt)
    })

}






}

