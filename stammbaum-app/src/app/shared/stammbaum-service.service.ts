import {Injectable} from '@angular/core';
import {CreatePersonRequest, Person, Stammbaum} from './types';

@Injectable({
  providedIn: 'root'
})
export class StammbaumServiceService {

  stammbaum?: Stammbaum;

  constructor() {

  }

  createEmptyStammbaum(name: string): Stammbaum {
    if (this.stammbaum === undefined) {
      this.stammbaum = {
        name,
        persons: []
      };
    }
    console.log(this.stammbaum);
    return this.stammbaum;
  }

  addPersonToStammbaum(personRequest: CreatePersonRequest): void {
    if (this.stammbaum !== undefined) {
      const person = {
        id: this.stammbaum.persons.length,
        ...personRequest
      };
      this.stammbaum.persons.push(person);
      console.log(this.stammbaum);
    }
  }
}
