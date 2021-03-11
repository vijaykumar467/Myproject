import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoleadminService } from 'src/app/guards/roleadmin.service';

@Component({
  selector: 'app-welcomeadmin',
  templateUrl: './welcomeadmin.component.html',
  styleUrls: ['./welcomeadmin.component.css']
})
export class WelcomeadminComponent implements OnInit {
  UserRole: string;

  constructor(private serRole: RoleadminService, private router: Router) {

          this.UserRole = this.serRole.RoleData;

  }

  ngOnInit(){

  }


}


