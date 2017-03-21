import { Component, OnInit, ViewEncapsulation, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { Input } from "@angular/core/src/metadata/directives";
import { SidenavItem } from "./sidenav-item.model";
import { SidenavService } from "../sidenav/sidenav.service";
import * as $ from "jquery";
import { SidemenuService } from "../../sidemenu.service";

@Component({
  selector: 'ms-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavItemComponent implements OnInit {

  @Input('item')
  item: SidenavItem;

  @ViewChild('sliding') sliding;
  @ViewChild('listItem') listItem;


  @HostBinding('class.open')
  get isOpen() {
    return this.sidenavService.isOpen(this.item);
  }

  @HostBinding('class.sidenav-item') sidenavItemClass: boolean = true;

  constructor(private sidenavService: SidenavService){}

  ngOnInit() {
  }

  onHover(){
    this.sidenavService.hoverEvent("mouseover");
    // $(this.sliding.nativeElement).show();
  }

  offHover(){
    this.sidenavService.hoverEvent("mouseleave");
    // $(this.sliding.nativeElement).hide(); 
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
