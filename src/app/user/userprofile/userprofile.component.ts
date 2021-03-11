import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private userSer: UserService) {
      this.GetUserProfile();
   }

  ngOnInit() {
  }

//getting the user register details
UserProfile: object
GetUserProfile(){
   this.userSer.serGetUserRegisterData().subscribe(dt=>{
        this.UserProfile = dt;
   })
}

//edit user profile
tempid: number = 0;
editname: string;
editemail: string;
editpassword: string;
editphone: number;
eidtgender: string;
eidtaddress: string;

EditProfile(user){
  //alert(uid)
  this.tempid = user._id;
  this.editname = user.UserName;
  this.editemail = user.Email;
  this.editpassword = user.Password;
  this.editphone = user.Mobile;
  this.eidtaddress = user.Address;

}

Update(){
  //alert('hiiii')
  var obj = [
    {_id: this.tempid},
    {UserName: this.editname, Email: this.editemail, Password: this.editpassword, Mobile: this.editphone, Address: this.eidtaddress}
  ]
  this.userSer.serUpadateUserRegisterData(obj).subscribe(dt=>{
     //alert(dt);
     this.GetUserProfile();
  })
}



















}
