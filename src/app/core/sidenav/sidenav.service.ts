import { Injectable, EventEmitter } from '@angular/core';
import { SidenavItem } from "../sidenav-item/sidenav-item.model";
import { BehaviorSubject, Observable } from "rxjs";
import * as _ from 'lodash';

@Injectable()
export class SidenavService {

  public hoverEventEmitter = new EventEmitter<string>();
  public navItemEmitter = new EventEmitter<SidenavItem>();

  private _itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _items: SidenavItem[] = [ ];
  items$: Observable<SidenavItem[]> = this._itemsSubject.asObservable();

  private _currentlyOpenSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private _currentlyOpen: SidenavItem[] = [ ];
  currentlyOpen$: Observable<SidenavItem[]> = this._currentlyOpenSubject.asObservable();

  isIconSidenav: boolean;

  constructor() {
    let menu = this;

    // let dashboard = menu.addItem('Dashboard', 'dashboard', '/', 1);

    let dashboard = menu.addItem('Dashboard',"assets/img/rm/dashboard.png", 'chat', 'admin/apps/inbox', 1, '22', '#7986CC');
    
    let admin = menu.addItem('Admin', "assets/img/rm/system-administration.png",'chat', 'admin/apps/chat', 2, '14', '#E15C74');
    menu.addSubItem(admin,'Company Profile','#',1);
    menu.addSubItem(admin,'Subscriptions and Billing','#',2);
    menu.addSubItem(admin,'Users and Permissions','#',3);
    menu.addSubItem(admin,'System Settings','#',4);

    let stores = menu.addItem('Stores', "assets/img/rm/stores.png",'date_range', 'admin/apps/calendar', 3);
    let storeConfigurations_sub = menu.addSubItem(stores,'Store Configurstions','#',1);
    menu.addSubItem(storeConfigurations_sub,'Payment Methods','#',1);
    menu.addSubItem(storeConfigurations_sub,'Shipping Methods','#',2);
    menu.addSubItem(storeConfigurations_sub,'Taxes','#',3);

    let stores_sub = menu.addSubItem(stores,'Stores','#',2);
    menu.addSubItem(stores_sub,'Store A(POS)','#',1);
    menu.addSubItem(stores_sub,'Store A(Call Center)','#',2);
    menu.addSubItem(stores_sub,'Store A(Facebook)','#',3);
    menu.addSubItem(stores_sub,'Store A(Online)','#',4);
    menu.addSubItem(stores_sub,'Store A(DropShip)','#',5);
    menu.addSubItem(stores_sub,'Store A(Reseller)','#',6);
    menu.addSubItem(stores_sub,'Store A(Lazada)','#',7);

    let product = menu.addItem('Product', "assets/img/rm/product-and-pricing.png",'date_range', 'admin/apps/calendar', 3);
    menu.addSubItem(product,'Categories','#',1);
    menu.addSubItem(product,'Products','#',2);
    menu.addSubItem(product,'Product Attributes','#',3);
    menu.addSubItem(product,'Categories','#',4);
    let promotions_sub = menu.addSubItem(product,'Promotions','#',5);
    menu.addSubItem(promotions_sub,'Catalog Price Rules','#',1);
    menu.addSubItem(promotions_sub,'Shopping Cart Rules','#',2);
    menu.addSubItem(promotions_sub,'Coupon Codes','#',3);




    let inventory = menu.addItem('Inventory', "assets/img/rm/inventory.png",'date_range', 'admin/apps/calendar', 3);
    let inventory_sub = menu.addSubItem(inventory,'Inventory','#',1);
    menu.addSubItem(inventory_sub,'Configuration','#',1);
    menu.addSubItem(inventory_sub,'Wharehouses','#',2);
    menu.addSubItem(inventory_sub,'Wharehouse Routing','#',3);
    menu.addSubItem(inventory_sub,'Stocktaking','#',4);
    menu.addSubItem(inventory_sub,'Stock Transfers','#',5);
    menu.addSubItem(inventory_sub,'Stock Movements','#',6);

    let procurement_sub = menu.addSubItem(inventory,'Procurement','#',2);
    menu.addSubItem(procurement_sub,'Configuration','#',1);
    menu.addSubItem(procurement_sub,'Demand Planning','#',2);
    menu.addSubItem(procurement_sub,'Stock Requisition','#',3);
    menu.addSubItem(procurement_sub,'Purchase Orders','#',4);
    menu.addSubItem(procurement_sub,'Suppliers','#',5);
    menu.addSubItem(procurement_sub,'Link Products to suppliers','#',6);
    menu.addSubItem(procurement_sub,'Products on order','#',7);

    let sales = menu.addItem('Sales', "assets/img/rm/sales-orders.png",'date_range', '/apps/calendar', 3);
    menu.addSubItem(sales,'Orders','#',1);
    menu.addSubItem(sales,'Invoices','#',2);
    menu.addSubItem(sales,'Shipments','#',3);
    menu.addSubItem(sales,'Credit Memos','#',4);

    let fulfilment = menu.addItem('Fulfilment', "assets/img/rm/packing-and-shipping.png",'date_range', '/apps/calendar', 3);
    menu.addSubItem(fulfilment,'Configuration','#',1);
    menu.addSubItem(fulfilment,'Order Preperations','#',2);
    menu.addSubItem(fulfilment,'Shipping methods and tariffs','#',3);

    let customers = menu.addItem('Customers', "assets/img/rm/customers-and-customer-relations.png",'date_range', '/apps/calendar', 3);
    menu.addSubItem(customers,'Customer Configuration','#',1);
    menu.addSubItem(customers,'Customers','#',2);
    menu.addSubItem(customers,'Customer Groups','#',3);
    menu.addSubItem(customers,'Customer Relations(CRM)','#',4);
    menu.addSubItem(customers,'Newsletter Subscriptions','#',5);
    menu.addSubItem(customers,'Email Configurations and Templates','#',6);
    menu.addSubItem(customers,'Sms Configurations and Templates','#',7);

    let channels = menu.addItem('Channels', "assets/img/rm/sales-channel.png",'date_range', '/apps/calendar', 3);
    menu.addSubItem(channels,'Dropshippers','#',1);
    menu.addSubItem(channels,'Resellers','#',2);
    menu.addSubItem(channels,'Social Media','#',3);
    menu.addSubItem(channels,'MarketPlaces','#',4);

    let finance = menu.addItem('Finance', "assets/img/rm/finance-and-accounting.png",'date_range', '/apps/calendar', 3);
    
    let payment_validation_sub = menu.addSubItem(finance,'Payment Validation','#',1);
    menu.addSubItem(payment_validation_sub,'Validate Online Payments','#',1);
    menu.addSubItem(payment_validation_sub,'Validate Bank Payments','#',2);
    
    let accouting_sub = menu.addSubItem(finance,'Payment Validation','#',2);
    menu.addSubItem(accouting_sub,'Card Settlements','#',1);
    menu.addSubItem(accouting_sub,'iPay88 settlements','#',2);
    menu.addSubItem(accouting_sub,'FPX Settlements','#',3);
    menu.addSubItem(accouting_sub,'Enter bills and expenses','#',4);
    menu.addSubItem(accouting_sub,'Match payments and expenses','#',5);
    menu.addSubItem(accouting_sub,'Upload credit memos','#',6);

    let reports = menu.addItem('Reports', "assets/img/rm/reporting-analysis.png",'date_range', '/apps/calendar', 3);
    menu.addSubItem(reports,'Reports','#',1);
    menu.addSubItem(reports,'Analytics','#',2);

    let settings = menu.addItem('Settings', "assets/img/rm/system-settings.png",'date_range', '/apps/calendar', 3);
    menu.addSubItem(settings,'Register Apis','#',1);
    menu.addSubItem(settings,'Subscribers, admin users and permissions','#',2);
    // let components =  menu.addItem('Product', 'layers', null, 3);
    // menu.addSubItem(components, 'Autocomplete', '/components/autocomplete', 1);
    // menu.addSubItem(components, 'Buttons', '/components/buttons', 2);
    // menu.addSubItem(components, 'Cards', '/components/cards', 3);
    // menu.addSubItem(components, 'Dialogs', '/components/dialogs', 4);
    // menu.addSubItem(components, 'Grid List', '/components/grid-list', 5);
    // menu.addSubItem(components, 'Lists', '/components/lists', 6);
    // menu.addSubItem(components, 'Menu', '/components/menu', 7);
    // menu.addSubItem(components, 'Slider', '/components/slider', 8);
    // menu.addSubItem(components, 'Snack-Bar', '/components/snack-bar', 9);
    // menu.addSubItem(components, 'Tooltips', '/components/tooltips', 10);

    // let forms = menu.addItem('Forms', 'insert_comment', null, 4);
    // menu.addSubItem(forms, 'Form Elements', '/forms/form-elements', 1);
    // menu.addSubItem(forms, 'Form Wizard', '/forms/form-wizard', 1);

    // let tables =  menu.addItem('Tables', 'format_line_spacing', null, 5);
    // menu.addSubItem(tables, 'Simple Table', '/tables/simple-table', 1);
    // menu.addSubItem(tables, 'Fixed Header Table', '/tables/fixed-header-table', 2);

    // let maps =  menu.addItem('Maps', 'map', null, 6, '3', '#4CAF50');
    // menu.addSubItem(maps, 'Google Maps', '/maps/google-maps', 1);

    // let icons = menu.addItem('Material Icons', 'grade', '/icons', 7);

    // let customPages = menu.addItem('Custom Pages', 'web', null, 8);
    // menu.addSubItem(customPages, 'Login Page', '/login', 1);
    // menu.addSubItem(customPages, 'Register Page', '/register', 2);
    // menu.addSubItem(customPages, 'Forgot Password', '/forgot-password', 3);
    // menu.addSubItem(customPages, 'Dashboard v1', '/dashboard-v1', 4);

    // let dragAndDrop = menu.addItem('Drag & Drop', 'mouse', '/drag-and-drop', 9);

    // let editor = menu.addItem('WYSIWYG Editor', 'format_shapes', '/editor', 10, 'NEW', '#3F51B5');

    // let dynamicMenu = menu.addItem('Dynamic Menu', 'extension', '/dynamic-menu', 11);

    // let multiLevel = menu.addItem('Multi-Level Menu', 'menu', null, 12);
    // let level1 = menu.addSubItem(multiLevel, 'Level 1', '/level1', 1);
    // let level2 = menu.addSubItem(level1, 'Level 2', '/level1/level2', 2);
    // let level3 = menu.addSubItem(level2, 'Level 3', '/level1/level2/level3', 3);
    // let level4 = menu.addSubItem(level3, 'Level 4', '/level1/level2/level3/level4', 4);
    // let level5 = menu.addSubItem(level4, 'Level 5', '/level1/level2/level3/level4/level5', 5);
  }

  hoverEvent(value: string){
    this.hoverEventEmitter.emit(value)
  }

  sendItem(item:SidenavItem){
    this.navItemEmitter.emit(item);
  }

  addItem(name: string, image: string ,icon: string, route: string, position: number, badge?: string, badgeColor?: string) {
    let item = new SidenavItem({
      name: name,
      image: image,
      icon: icon,
      route: route,
      subItems: [ ],
      position: position || 99,
      badge: badge || null,
      badgeColor: badgeColor || null
    });

    this._items.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  addSubItem(parent: SidenavItem, name: string, route: string, position: number) {
    let item = new SidenavItem({
      name: name,
      route: route,
      parent: parent,
      subItems: [ ],
      position: position || 99
    });

    parent.subItems.push(item);
    this._itemsSubject.next(this._items);

    return item;
  }

  removeItem(item: SidenavItem) {
    let index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
    }

    this._itemsSubject.next(this._items);
  }

  isOpen(item: SidenavItem) {
    return (this._currentlyOpen.indexOf(item) != -1);
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this._currentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this._currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [ ];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = [ ]) {
    currentlyOpen.unshift( item );

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this._currentlyOpen = currentlyOpen;
    this._currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    let currentlyOpen = [ ];

    let item = this.findByRouteRecursive(route, this._items);

    if (item && item.hasParent()) {
      currentlyOpen = this.getAllParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: String, collection: SidenavItem[]) {
    let result = _.find(collection, { 'route': route });

    if (!result) {
      _.each(collection, (item) => {
        if (item.hasSubItems()) {
          let found = this.findByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    }

    return result;
  }

  get currentlyOpen() {
    return this._currentlyOpen;
  }

}
