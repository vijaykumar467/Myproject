import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminserviceService } from '../adminservices/adminservice.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    product:object;
    prdsearch;
    prdord:boolean=true;

//data getting dropdowns
    drpcat:string;
    drpsubcat:string;
    drpsubsubcat:string;
    drpbrand: string;

//data getting from cat, subcat and subsubcat
catData:object;
subcatData:object;
subsubcatData:object

//validations
productForm: FormGroup;
submitted = false;

constructor(private comser: CommonService, private formBuilder: FormBuilder, private adminser: AdminserviceService) {
         this.catget();
         this.subcatget();
         this.subsubcatget();
         this.GetBrand();
         this.Retrieve();
         var str = document.URL;
         var arr = str.split("?");
         if(arr[1]=="status = 1"){
           this.comser.modalemitter.emit({resp: "Product Item Added"})
         }

  }
  //adding more colors code
  txtcoloradd
  funcoloradd(pid){
     alert(pid)
     //alert(this.txtcoloradd)
    var obj3 = {
        PID: pid,
        Color: this.txtcoloradd
    }
  this.comser.AddMoreColors(obj3).subscribe((dt:any)=>{
      if(dt.resp == 0)
      {
        this.comser.modalemitter.emit({resp:"Color Not Added"})
      }
      else
      {
        this.comser.modalemitter.emit({resp:"Color Added"})
        this.txtcoloradd = ""
      }
  })

}


  ngOnInit() {
    this.productForm = new FormGroup({
      productname: new FormControl (" ", [Validators.required]),
      catname: new FormControl (" ", [Validators.required]),
      subcatname: new FormControl (" ", [Validators.required]),
      subsubcatname: new FormControl (" ", [Validators.required]),
      brandname: new FormControl (" ", [Validators.required]),
      color: new FormControl (" ", [Validators.required]),
      oldprice: new FormControl (" ", [Validators.required]),
      newprice: new FormControl (" ", [Validators.required]),
      description: new FormControl (" ", [Validators.required]),
      rating: new FormControl (" ", [Validators.required]),
      offer: new FormControl (" ", [Validators.required]),
      prdtype: new FormControl (" ", [Validators.required]),
      size: new FormControl (" ", [Validators.required]),
      quantity: new FormControl (" ", [Validators.required]),
     // upload: new FormControl (" ", [Validators.required])
    })
  }



//functions to get the data from cat , subcat and subsubcat
catget(){
  this.comser.Catdata = this.catData;
  this.comser.sercatGetter().subscribe(dt=>{
     this.catData = dt;
     if(this.catData == null){
        this.comser.sercatSetter().subscribe(dt=>{
            this.catData = dt;
        })
     }
  })
}

subcatget(){
  this.comser.SubcatData = this.subcatData;
  this.comser.serSubcatGetter().subscribe(dt=>{
     this.subcatData = dt;
     if(this.subcatData == null){
        this.comser.serSubcatSetter().subscribe(dt=>{
            this.subcatData = dt;
        })
     }
  })
}
subsubcatget(){
  this.comser.SubsubcatData = this.subsubcatData;
  this.comser.serSubsubcatGetter().subscribe(dt=>{
     this.subsubcatData = dt;
     if(this.subsubcatData == null){
        this.comser.serSubsubcatSetter().subscribe(dt=>{
            this.subsubcatData = dt;
        })
     }
  })
}

//getting the brand data
 brandData:object;
GetBrand(){
     this.comser.BrandGet = this.brandData;
     this.comser.serBrandGetter().subscribe(dt=>{
        this.brandData = dt;
        if(this.brandData == null){
           this.comser.serBrandSetter().subscribe(dt=>{
              this.brandData = dt;
           })
        }
     })
  }
//Product insert function
    prdid:number = 0;
    prdname:string;
    prdcolor:string;
    prdoldprice:number;
    prdnewprice:number;
    prddescription:string;
    prdrating:string;
    prdoffer:string;
    producttype:string;
    prdimg:string;
    prdsize:string;
    prdstatus:string
    prdquantity: number;
Insert(){
    this.submitted = true;
    if(this.productForm.valid)
    {
       var obj1 = {
                   ProductName: this.prdname,
                   Cat_Id: this.drpcat,
                   Subcat_Id: this.drpsubcat,
                   Subsubcat_Id: this.drpsubsubcat,
                   Brand_Id: this.drpbrand,
                   Color: this.prdcolor,
                   OldPrice: this.prdoldprice,
                   NewPrice: this.prdnewprice,
                   Quantity: this.prdquantity,
                   ItemDescryption: this.prddescription,
                   ItemRating : this.prdrating,
                   Offers: this.prdoffer,
                   ProductType: this.producttype,
                  //UploadFile: this.prdimg,
                   Size: this.prdsize,
                   Status: "1"
            }
       this.comser.serProductInsert(obj1).subscribe((dt:any)=>{
           if(dt.resp == 0){
                this.comser.modalemitter.emit({resp: 'Prodcut Not Inserted'});
           }
           else{
              this.comser.serProductSetter().subscribe(dt=>{
              this.product = dt;
              var formref=<HTMLFormElement>document.getElementById("f1")
              formref.submit()
              this.comser.modalemitter.emit({resp: "Product Item Inserted"});
                 this.Retrieve();
             })
           }
       })
    }
}


//ag-grid data getting

column=[

  {headerName:"Product Name", field:"ProductName", sortable:true, filter:true},
  {headerName:"Category Name", field:"CategoryName", sortable:true, filter:true},
  {headerName:"Subcategory Name", field:"SubcategoryName", sortable:true, filter:true},
  {headerName:"Subsubcategory Name", field:"SubsubcategoryName", sortable:true, filter:true},
  {headerName:"Brand Name", field:"BrandName", sortable:true, filter:true},
  {headerName:"Color", field:"Color", sortable:true, filter:true},
  {headerName:"OldPrice", field:"OldPrice", sortable:true, filter:true},
  {headerName:"NewPrice", field:"NewPrice", sortable:true, filter:true},
  {headerName:"quantity", field:"Quantity", sortable:true, filter:true},
  {headerName:"Description", field:"ItemDescryption", sortable:true, filter:true},
  {headerName:"Rating", field:"ItemRating", sortable:true, filter:true},
  {headerName:"Offers", field:"Offers", sortable:true, filter:true},
  {headerName:"ProductType", field:"ProductType", sortable:true, filter:true},
  {headerName:"Size", field:"Size", sortable:true, filter:true},
  {headerName:"Status", field:"Status", sortable:true, filter:true}
];


ProductMod = AllCommunityModules;
//product getting data
 arrnew: any=[];

Retrieve(){
  this.comser.serProductGetter().subscribe((dt:any)=>{
      this.product = dt;
      if(this.product == null){
         this.comser.serProductSetter().subscribe((dt:any)=>{
            for(var i = 0; i<dt.length; i++){
                this.arrnew.push(dt[i].items);
            }
            this.product = this.arrnew;
         })
      }
  })
}


  functionedit(product) {
    this.prdid = product.Pid;
    this.prdname = product.ProductName;
    this.drpcat = product.catId;
    this.drpsubcat = product.subcatId;
    this.drpsubsubcat = product.subsubcatId;
    this.prdcolor = product.color;
    this.prdoldprice = product.oldPrice;
    this.prdnewprice = product.newPrice;
    this.prddescription = product.Description;
    this.prdrating = product.rating;
    this.prdoffer = product.Offers;
    this.producttype = product.ProductType;
    this.prdimg = product.images;
    this.prdsize = product.size;
    this.prdstatus = product.status;

 }



}
