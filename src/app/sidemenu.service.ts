import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SidemenuService {

  emitHover = new EventEmitter<string>();

  constructor() { }

  pushEvent(value: string){
  	this.emitHover.emit(value);
  }

}
