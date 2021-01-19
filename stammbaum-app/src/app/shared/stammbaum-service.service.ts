import {Injectable} from '@angular/core';
import {CreatePersonRequest, Person, Stammbaum} from './types';

@Injectable({
  providedIn: 'root'
})
export class StammbaumServiceService {

  stammbaum?: Stammbaum;

  constructor() {

  }

  private static makeUUID(): number {
    let uuid = '';
    for (let i = 0; i < 10; i++) {
      uuid += Math.round(Math.random() * 9).toString();
    }
    console.log(uuid);
    return parseInt(uuid, 10);
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
        id: StammbaumServiceService.makeUUID(),
        ...personRequest
      };
      this.stammbaum.persons.push(person);
      console.log(this.stammbaum);
    }
  }

  deletePersonFromStammbaum(person: Person): void {
    if (this.stammbaum !== undefined) {
      for (let i = 0; i < this.stammbaum.persons.length; i++) {
        if (person.id === this.stammbaum.persons[i].id) {
          this.stammbaum.persons.splice(i, 1);
        }
      }
    }
  }
}
