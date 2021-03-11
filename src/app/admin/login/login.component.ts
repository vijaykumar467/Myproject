import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../adminauthentication/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  txtuname:string;
  txtpwd:string;
  //validations
  uname:string;
  pwd:string;

  myform:FormGroup;
  submitted = false;

  constructor(private ss:AuthenticationService, private rt: Router, private comser: CommonService, private formbuilder: FormBuilder) {

   }

  ngOnInit() {
    this.myform = this.formbuilder.group({
      uname : [" ", Validators.required],
      pwd: [" ", Validators.required]
    })
  }
get loginf(){
  return this.myform.controls;
}

 login(){
   this.submitted = true;
   if(this.myform.invalid){
     return;
   }
   else{
      var obj = {uname:this.txtuname, pwd: this.txtpwd}
      this.ss.serAdminLogin(obj).subscribe((dt:any)=>{
      if(dt.resp == 0){
      this.comser.modalemitter.emit({resp: "Invalid login credentials"})
     }
     else{
       localStorage.setItem('token', dt.resp);
      // this.comser.modalemitter.emit({resp: "Login Success"})
      this.rt.navigateByUrl('admin/welcome')
      }
   })
  }
 }





  }
