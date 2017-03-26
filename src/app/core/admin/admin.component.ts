import {Component, OnInit, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Router, NavigationEnd} from "@angular/router";
import * as screenfull from 'screenfull';
import * as $ from "jquery";
import { SidenavService } from "../sidenav/sidenav.service";
import { SidenavItem } from "../sidenav-item/sidenav-item.model";

@Component({
  selector: 'ms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  @ViewChild('sidenav') sidenav;
  @ViewChild('scrollContainer') scrollContainer;
  @ViewChild('sidenavContainer') sidenavContainer;
  @ViewChild('row') row;
  @ViewChild('col4') col4;
  @ViewChild('col8') col8;
  @ViewChild('rowDiv') rowDiv;

  public item: SidenavItem;
  public subItems: SidenavItem[];
  
  
  private _mediaSubscription: Subscription;
  sidenavOpen: boolean = false;
  sidenavMode: string = 'side';
  isMobile: boolean = false;

  private _routerEventsSubscription: Subscription;

  quickpanelOpen: boolean = false;

  isFullscreen: boolean = false;

  constructor(
    private media: ObservableMedia,
    private router: Router,
    private sidenavService: SidenavService
  ) { }

  hasSubItems(){
    if(this.subItems != null){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit() {
    this._mediaSubscription = this.media.asObservable().subscribe((change: MediaChange) => {
      let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');

      this.isMobile = isMobile;
      this.sidenavMode = (isMobile) ? 'over' : 'side';
      this.sidenavOpen = !isMobile;
    });

    this.removeGridClasses();

    console.log($(window).height());


    console.log(this.getItemHeight(this.item));
    
    this.sidenavService.navItemEmitter.subscribe((data)=>{
      this.item = data;
      this.subItems = data.subItems;
    })
   

    this.sidenavService.hoverEventEmitter.subscribe((data)=>{
      console.log(this.getItemHeight(this.item));
      if(data == "mouseover"){
        this.openSideNav();
      }else if(data == "mouseleave"){
        this.closeSideNav();
      }
    })

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });
  }

  createMarkup(){
    var rowDiv = $(this.rowDiv.nativeElement);
    var oneColumn = false;
    var twoColumn = false;
    var threeColumn = false;

    var breakItemOne = null;
    var breakItemTwo = null;
    var breakItemThree = null;

    var wholeItemWidth = this.getItemHeight(this.item);
    var contentHeight1 = 0;
    var contentHeight2 = 0;

    if(this.getItemHeight(this.item) < this.getWindowHeight()){
      oneColumn = true;
    }

    // run the loop and calculate the variables
    for(let item of this.item.subItems){
      contentHeight1 = contentHeight1 + this.getItemHeight(item);
      console.log("contentHeight1 = " + contentHeight1);
      if(contentHeight1 > this.getWindowHeight()){
        twoColumn = true;
        oneColumn = false;

        console.log("twoColumn " + twoColumn + "oneColumn = "+ oneColumn);
        breakItemTwo = item;
        console.log(breakItemTwo);
        for(let subitem of item.subItems){
          contentHeight2 = contentHeight2 + this.getItemHeight(subitem);
          console.log(contentHeight2);
          if(contentHeight2 > this.getWindowHeight()){
            threeColumn = true;
            twoColumn = false;
            breakItemThree = subitem;
          }
        }
      }
    }

    // after the loop is run, generate the content using the variables
    rowDiv.html("");
    if(oneColumn == true){
      var columnDiv = $("<div class='col-md-12' style='margin-left:30px;'></div>")
      var content = "";
      for(let item of this.item.subItems){
        content = content + "<h4>"+item.name+"</h4>"
        if(item.subItems.length > 0){
          for(let subitem of item.subItems){
            console.log(subitem)
            content = content + "<p>"+subitem.name+"</p>"
          }
        }
      }
      console.log(content);
      columnDiv.html(content);
      rowDiv.html(columnDiv.html());
    }else if(twoColumn){

    }else if(threeColumn){

    }
    
  }

  getWindowHeight(){
    return $(window).height();
  }

  getItemHeight(item: SidenavItem){
    var contentHeight = 0;
    if(item != null){
      if(item.subItems.length > 0){
        contentHeight = contentHeight + item.subItems.length * (19 + 16);
        for (let subitem of item.subItems) {
          if(subitem.subItems.length > 0){ 
           contentHeight = contentHeight + subitem.subItems.length * (21 + 16); 
           for( let subsubitem of subitem.subItems){
             if(subsubitem.subItems.length > 0){
               contentHeight = contentHeight + subsubitem.subItems.length * (21 + 16);
             }
           } 
          }
        }
      }  
    }
    return contentHeight;
  }

  removeGridClasses(){
    $(this.row.nativeElement).removeClass('row');
    $(this.col8.nativeElement).removeClass('col-md-8');
    $(this.col4.nativeElement).removeClass('col-md-4').hide();
  }

  openSideNav(){
    $(this.row.nativeElement).addClass('row');
    $(this.col4.nativeElement).addClass('col-md-4').show("slide");
    $(this.col8.nativeElement).hide().addClass("col-md-8").show(600);
    this.sidenavService.navMenuOpen();
    this.createMarkup();
  }

  closeSideNav(){
    $(this.col8.nativeElement).show(400).removeClass("col-md-8");
    $(this.col4.nativeElement).hide().removeClass('col-md-4');
    $(this.row.nativeElement).show(400).removeClass('row');
    this.sidenavService.navMenuClose();
  }

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }

  ngOnDestroy() {
    this._mediaSubscription.unsubscribe();
  }

  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
