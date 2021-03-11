import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
ActivationData: string;
  constructor(private serUser: UserService, private head: HeaderComponent) {

          var string = document.URL
          //alert(string)
          var array = string.split("?")
          //alert(array)
          array = (array[1].split("="));
        var  data = {ActiveMailId: array[0]}

        this.serUser.serUserActivationLink(data).subscribe((dt:any)=>{
             this.ActivationData = dt.resp;
        })

   }

//login popup code
LoginPopup(){
  this.head.ModalPopup1();
}



  ngOnInit() {
  }

}
