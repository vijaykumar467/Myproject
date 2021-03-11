import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
declare var $: any;
@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  constructor(private userSer: UserService) {
   }

  ngOnInit() {

  }



  right3(){
    $("#DivInner1").animate({left: '-2000px'}, 1000)
 }

 left3(){
   $("#DivInner1").animate({left: '00px'}, 1000)
 }




/*
  (function(){
    $('#carousel123').carousel({ interval: 2000 });

    $('.carousel-showsixmoveone .item').each(function(){
      var itemToClone = $(this);

      for (var i=1;i<6;i++) {
        itemToClone = itemToClone.next();

        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }

        // grab item, clone, add marker class, add to collection
        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-"+(i))
          .appendTo($(this));
      }
    });
  }());*/






}


