import {Component, OnInit, Inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Router, NavigationEnd} from "@angular/router";
import * as screenfull from 'screenfull';
import * as $ from "jquery";
import { SidenavService } from "../sidenav/sidenav.service";

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

  ngOnInit() {
    this._mediaSubscription = this.media.asObservable().subscribe((change: MediaChange) => {
      let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');

      this.isMobile = isMobile;
      this.sidenavMode = (isMobile) ? 'over' : 'side';
      this.sidenavOpen = !isMobile;
    });

    $(this.row.nativeElement).removeClass('row');
    $(this.col8.nativeElement).removeClass('col-md-8');
    $(this.col4.nativeElement).removeClass('col-md-4').hide();
    
   

    this.sidenavService.hoverEventEmitter.subscribe((data)=>{
      if(data == "mouseover"){
        console.log("mouse over called");
        $(this.row.nativeElement).addClass('row');
        $(this.col4.nativeElement).addClass('col-md-4').show("slide");
        $(this.col8.nativeElement).addClass('col-md-8');
        // $(this.col8.nativeElement).width($(this.col8.nativeElement).width()-$(this.col4.nativeElement).width() + "px");
      }else if(data == "mouseleave"){
        console.log("mouse leave called");
        $(this.col8.nativeElement).removeClass('col-md-8');
        $(this.col4.nativeElement).removeClass('col-md-4').hide();
        $(this.row.nativeElement).removeClass('row');
        $(this.col8.nativeElement).width("100%");
      }
    })

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidenav.close();
      }
    });
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
