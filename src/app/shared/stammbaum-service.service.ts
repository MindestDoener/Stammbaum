import {Injectable, OnInit} from '@angular/core';
import {CreatePersonRequest, Person, Stammbaum} from './types';

@Injectable({
  providedIn: 'root'
})
export class StammbaumServiceService implements OnInit {

  stammbaum?: Stammbaum;
  stammbaumList?: Stammbaum[];

  ngOnInit(){
    this.stammbaumList = [];
  }
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
    if(this.stammbaumList === undefined){
      this.stammbaumList = []
    }
    this.stammbaum = {
      name,
      persons: new Map<number, Person>(),
      id
    };

    this.stammbaumList?.push(this.stammbaum);
    this.stammbaum = undefined;
  }

  addPerson(personRequest: CreatePersonRequest): Person {
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

  getTreeList(): Stammbaum[] {
    return this.stammbaumList ?? [];
  }

  getSingleTree(id: string | null): Stammbaum | undefined{
    if(this.stammbaumList !== []){
      return this.stammbaumList?.find(stammbaum => stammbaum.id === id);
    }else{
      return undefined;
    }
  }
}
