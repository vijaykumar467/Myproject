import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addcolors',
  templateUrl: './addcolors.component.html',
  styleUrls: ['./addcolors.component.css']
})
export class AddcolorsComponent implements OnInit {

  constructor(private comSer: CommonService, private formBuilder: FormBuilder) {
    this.GetProductsNames();
    this.GetColorCodeData();
  }

  ngOnInit() {
      this.AddColorsForm = new FormGroup({
           ProductId: new FormControl (" ", Validators.required),
           colorId: new FormControl (" ", Validators.required)
      })
  }


//validations
AddColorsForm: FormGroup;
submitted = false;


//getting the all products names
AllProducts:any;
ProductArray = [];
GetProductsNames(){
  this.comSer.serProductGetter().subscribe((dt:any)=>{
    this.AllProducts = dt;
    if(this.AllProducts == null){
       this.comSer.serProductSetter().subscribe((dt:any)=>{
          for(var i = 0; i<dt.length; i++){
              this.ProductArray.push(dt[i].items);
          }
          this.AllProducts = this.ProductArray;
       })
    }
  })
}

//getting the color code
ColorCode: any;
GetColorCodeData(){
  this.comSer.serGetColorCode().subscribe(dt=>{
       this.ColorCode = dt;
  })
}

//insert the product id, color and images code
productid: string;
colors: string;
imgupload: string;

SaveProducts(){
  this.submitted = true;
  if(this.AddColorsForm.valid)
  {
      var obj = {
        Product_Id : this.productid,
        Color_Id : this.colors
      }
     this.comSer.serInsertProductWithColorImages(obj).subscribe((dt:any)=>{

              var formref=<HTMLFormElement>document.getElementById("f2")
              formref.submit()
              this.comSer.modalemitter.emit({resp: "Product Item Inserted"});

     })
  }

}












}
