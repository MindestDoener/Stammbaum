import {Injectable} from '@angular/core';
import {CreatePersonRequest, Person, Stammbaum} from './types';

@Injectable({
  providedIn: 'root'
})
export class StammbaumServiceService {

  stammbaum?: Stammbaum;

  constructor() {

  }

  private makeUUID(): number {
    let uuid = '';
    for (let i = 0; i < 10; i++) {
      uuid += Math.round(Math.random() * 9).toString();
    }
    const num = parseInt(uuid, 10);
    // check for duplicate ids
    if (this.stammbaum) {
      for (const person of this.stammbaum?.persons) {
        if (person.id === num) {
          return this.makeUUID();
        }
      }
    }
    return num;
  }

  createEmptyStammbaum(name: string): Stammbaum {
    if (this.stammbaum === undefined) {
      this.stammbaum = {
        name,
        persons: []
      };
    }
    return this.stammbaum;
  }

  addPerson(personRequest: CreatePersonRequest): void {
    if (this.stammbaum !== undefined) {
      const person = {
        id: this.makeUUID(),
        ...personRequest
      };
      this.stammbaum.persons.push(person);
    }
  }

  // Takes Person as input and changes data of person in array with same id to data of person in parameter
  updatePerson(person: Person): void {
    if (this.stammbaum !== undefined) {
      for (let i = 0; i < this.stammbaum.persons.length; i++) {
        if (person.id === this.stammbaum.persons[i].id) {
          this.stammbaum.persons[i] = person;
        }
      }
    }
  }

  deletePerson(person: Person): void {
    if (this.stammbaum !== undefined) {
      for (let i = 0; i < this.stammbaum.persons.length; i++) {
        if (person.id === this.stammbaum.persons[i].id) {
          this.stammbaum.persons.splice(i, 1);
        }
      }
    }
  }
}
