import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-searchproducts',
  templateUrl: './searchproducts.component.html',
  styleUrls: ['./searchproducts.component.css']
})
export class SearchproductsComponent implements OnInit {
 SearchProductData: object
  constructor(private userSer: UserService) {
        this.SearchProductData = this.userSer.SearchProductsData;

  }

  ngOnInit() {

  }




}
