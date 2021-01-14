import { Injectable } from '@angular/core';
import { Person, Stammbaum } from './types';

@Injectable({
  providedIn: 'root'
})
export class StammbaumServiceService {

  stammbaum?: Stammbaum;

  constructor() { 

  }

  createEmptyStammbaum(name: string) {
    if(this.stammbaum == undefined) {
      this.stammbaum = {
        name,
        persons: []
      }
    }
  }

  addPersonToStammbaum(person: Person) {
    if(this.stammbaum !== undefined) {
      this.stammbaum.persons.push(person);
      console.log(this.stammbaum);
    }
  }
}
