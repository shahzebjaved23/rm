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
  @ViewChild('col4') sideNavColumn;
  @ViewChild('col8') mainColumn;
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
    $(this.sideNavColumn.nativeElement).removeClass("col-md-2");
    $(this.mainColumn.nativeElement).removeClass('col-md-10');

   
    
    this.sidenavService.navItemEmitter.subscribe((data)=>{
      this.item = data;
      this.subItems = data.subItems;
    })
   

    this.sidenavService.hoverEventEmitter.subscribe((data)=>{
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

    if(this.getItemHeight(this.item) < this.getWindowHeight() - 200){
      oneColumn = true;
    }

    // run the loop and calculate the variables
    for(let item of this.item.subItems){
      contentHeight1 = contentHeight1 + this.getSubItemHeight(item);
      if(contentHeight1 > (this.getWindowHeight() - 200)){
        twoColumn = true;
        oneColumn = false;
        breakItemTwo = item;
        console.log("one");
        for(let subitem of item.subItems){
          contentHeight2 = contentHeight2 + this.getSubItemHeight(subitem);
          if(contentHeight2 > this.getWindowHeight() - 200){
            threeColumn = true;
            twoColumn = false;
            breakItemThree = subitem;
          }
        }
      }
    }

    // after the loop is run, generate the content using the variables
    rowDiv.html("");
    console.log("two");
    if(oneColumn == true){
      $(this.row.nativeElement).addClass('row');
      $(this.sideNavColumn.nativeElement).addClass('col-md-2').show("slide");
      $(this.mainColumn.nativeElement).hide().addClass("col-md-10").show(400);
      var columnDiv = $("<div class='col-md-12'></div>")
      var content = "";
      for(let item of this.item.subItems){
        content = content + "<h4>"+item.name+"</h4>"
        if(item.subItems.length > 0){
          for(let subitem of item.subItems){
            content = content + "<p>"+subitem.name+"</p>"
          }
        }
      }
      columnDiv.html(content);
      rowDiv.css("margin-left","15px").html(columnDiv.html());
    }else if(twoColumn){
      var content1 = "";
      var content2 = "";
      var div1 = $("<div class='col-md-6 col-sm-6 col-xs-6'></div>");
      var div2 = $("<div class='col-md-6 col-sm-6 col-xs-6'></div>");

      $(this.row.nativeElement).addClass('row');
      $(this.sideNavColumn.nativeElement).addClass('col-md-4').show("slide");
      $(this.mainColumn.nativeElement).hide().addClass("col-md-8").show(400);

      for(let item of this.item.subItems){
        if(item != breakItemTwo){
          content1 = content1 + "<h4>"+item.name+"</h4>"
          if(item.subItems.length > 0){
            for(let subitem of item.subItems){
              content1 = content1 + "<p>"+subitem.name+"</p>"
            }
          }  
        }else{
          content2 = content2 + "<h4>"+item.name+"</h4>"
          if(item.subItems.length > 0){
            for(let subitem of item.subItems){
              content2 = content2 + "<p>"+subitem.name+"</p>"
            }
          }
        }
      }
      div1.html(content1);
      div2.html(content2);
      rowDiv.html("").css("margin-left","0px").append(div1).append(div2);
    }else if(threeColumn){
      
    }    
  }

  getWindowHeight(){
    return $(window).height();
  }

  getSubItemHeight(item: SidenavItem){
    var contentHeight = 0;
    if(item != null){
      contentHeight = contentHeight + (19 + 16); 
      if(item.subItems.length > 0){
        contentHeight = contentHeight + item.subItems.length * (21 + 16);
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
    $(this.mainColumn.nativeElement).removeClass('col-md-8 col-md-10');
    $(this.sideNavColumn.nativeElement).removeClass('col-md-4 col-md-2').hide();
  }

  openSideNav(){
    $(this.row.nativeElement).addClass('row');
    // $(this.sideNavColumn.nativeElement).addClass('col-md-4').show("slide");
    // $(this.mainColumn.nativeElement).hide().addClass("col-md-8").show(600);
    this.sidenavService.navMenuOpen();
    this.createMarkup();
  }

  closeSideNav(){
    $(this.mainColumn.nativeElement).show(400).removeClass("col-md-8 col-md-10");
    $(this.sideNavColumn.nativeElement).hide().removeClass('col-md-4 col-md-2');
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
