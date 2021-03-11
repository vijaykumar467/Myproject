 import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../adminauthentication/authentication.service';
import { CommonService } from 'src/app/service/common.service';
declare var $:any

@Component({
  selector: 'app-admincommon',
  templateUrl: './admincommon.component.html',
  styleUrls: ['./admincommon.component.css']
})

export class AdmincommonComponent implements OnInit {

  textmodal:string;

  constructor(private authserv: AuthenticationService, private commonser: CommonService) {
    this.commonser.modalemitter.subscribe(dt=>{
      this.textmodal=dt.resp;
      this.CommonfunModal();
    })

   }

  ngOnInit() {

  }

  CommonfunModal(){
    $("#myModal").modal("show");
  }

}

