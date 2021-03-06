import { Component, OnInit, ViewEncapsulation, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { SidenavItem } from "./sidenav-item.model";
import { SidenavService } from "../sidenav/sidenav.service";
import * as $ from "jquery";

@Component({
  selector: 'ms-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavItemComponent implements OnInit {

  @Input('item') item: SidenavItem;

  isMenuOpen: boolean = false;

  @ViewChild('sliding') sliding;
  @ViewChild('listItem') listItem;
  @ViewChild("img") img;
  @ViewChild("textSpan") textSpan;


  @HostBinding('class.open')
  get isOpen() {
    return this.sidenavService.isOpen(this.item);
  }

  @HostBinding('class.sidenav-item') sidenavItemClass: boolean = true;

  constructor(private sidenavService: SidenavService){}

  ngOnInit() {
    $(this.img.nativeElement).removeClass("img-colored").addClass("img-greyscale");
    this.sidenavService.navMenuState.subscribe((state)=>{
      if(state == 'open'){
        this.isMenuOpen = true;
      }else if(state == 'close'){
        this.isMenuOpen = false;
        $(this.textSpan.nativeElement).css("color","");
      }
    })

    this.sidenavService.navMenuState.subscribe((state)=>{
      if(state == "open"){

      }else if(state == "close"){
        $(this.img.nativeElement).removeClass("img-colored").addClass("img-greyscale");
      }
    })
  }

  onHover(e){
    this.sidenavService.sendItem(this.item);
    $(this.img.nativeElement).removeClass("img-greyscale").addClass("img-colored");
    $(this.textSpan.nativeElement).css("color","white");
    if(this.isMenuOpen){
      this.sidenavService.hoverEvent("mouseleave");
      // this.isMenuOpen = false;  
    }else{
      this.sidenavService.hoverEvent("mouseover");
      // this.isMenuOpen = true; 
    }
  }

  toggleDropdown(): void {
    if (this.item.hasSubItems()) {
      this.sidenavService.toggleCurrentlyOpen(this.item);
    }
  }

  // Receives the count of Sub Items and multiplies it with 48 (height of one SidenavItem) to set the height for animation.
  getSubItemsHeight(): string {
    return (this.getOpenSubItemsCount(this.item) * 48) + "px";
  }

  // Counts the amount of Sub Items there is and returns the count.
  getOpenSubItemsCount(item: SidenavItem): number {
    let count = 0;

    if (item.hasSubItems() && this.sidenavService.isOpen(item)) {
      count += item.subItems.length;

      item.subItems.forEach((subItem) => {
        count += this.getOpenSubItemsCount(subItem);
      })
    }

    return count;
  }

}
