import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {

  event = new EventEmitter();

  constructor() { }

  publishEvent(){
  	this.event.emit("this is the event");
  }

  

}
