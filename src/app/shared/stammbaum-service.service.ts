import {Injectable, OnInit} from '@angular/core';
import {CreatePersonRequest, Person, Stammbaum} from './types';

@Injectable({
  providedIn: 'root'
})
export class StammbaumServiceService{

  stammbaum?: Stammbaum;
  stammbaumList?: Map<string, Stammbaum> = new Map<string, Stammbaum>();

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
      if (this.stammbaum.persons.has(num)) {
        return this.makeUUID();
      }
    }
    return num;
  }

  createEmptyStammbaum(name: string, id: string){
    this.stammbaum = {
      name,
      persons: new Map<number, Person>(),
      id
    };

    this.stammbaumList?.set(id ,this.stammbaum);
    this.stammbaum = undefined;
  }

  addPerson(personRequest: CreatePersonRequest, id: string): Person {
    const person = {
      id: this.makeUUID(),
      ...personRequest
    };
    if (this.stammbaum !== undefined) {
      this.stammbaum.persons.set(person.id, person);

    }
    return person;
  }

  // Takes Person as input and changes data of person in map with same id to data of person in parameter
  updatePerson(person: Person): void {
    if (this.stammbaum !== undefined) {
      this.stammbaum.persons.set(person.id, person);
    }
  }

  deletePerson(person: Person): void {
    if (this.stammbaum !== undefined) {
      this.stammbaum.persons.delete(person.id);
    }
  }

  getPersonById(id: number): Person | undefined {
    if (this.stammbaum !== undefined) {
      return this.stammbaum.persons.get(id);
    }
    return undefined;
  }

  getTreeList(): Map<string, Stammbaum> | undefined {
      return this.stammbaumList;
  }

  getSingleTree(id: string | null): Stammbaum | undefined{
    if(id !== null){
      return this.stammbaumList!.get(id);
    }else{
      return undefined;
    }
  }
}
