import {Injectable} from '@angular/core';
import {CreatePersonRequest, Person, Stammbaum} from './types';

@Injectable({
  providedIn: 'root'
})
export class StammbaumServiceService {

  stammbaumList: Map<string, Stammbaum> = new Map<string, Stammbaum>();

  private makeUUID(treeId: string): number {
    let uuid = '';
    for (let i = 0; i < 10; i++) {
      uuid += Math.round(Math.random() * 9).toString();
    }
    const num = parseInt(uuid, 10);
    // check for duplicate ids
    if (this.stammbaumList?.get(treeId)) {
      if (this.stammbaumList.get(treeId)?.persons.has(num)) {
        return this.makeUUID(treeId);
      }
    }
    return num;
  }

  createEmptyStammbaum(name: string, id: string): void {
    const stammbaum = {
      name,
      persons: new Map<number, Person>(),
      id
    };

    this.stammbaumList.set(id, stammbaum);
  }

  addPerson(personRequest: CreatePersonRequest, treeId: string): Person {
    const person = {
      id: this.makeUUID(treeId),
      ...personRequest
    };
    if (this.stammbaumList !== undefined) {
      this.stammbaumList.get(treeId)?.persons.set(person.id, person);
    }
    return person;
  }

  // Takes Person as input and changes data of person in map with same id to data of person in parameter
  updatePerson(person: Person, treeId: string): void {
    if (this.stammbaumList !== undefined) {
      this.stammbaumList.get(treeId)?.persons.set(person.id, person);
    }
  }

  deletePerson(person: Person, treeId: string): void {
    if (this.stammbaumList !== undefined) {
      this.stammbaumList.get(treeId)?.persons.delete(person.id);
    }
  }

  getPersonById(id: number, treeId: string): Person | undefined {
    if (this.stammbaumList !== undefined) {
      return this.stammbaumList.get(treeId)?.persons.get(id);
    }
    return undefined;
  }

  getTreeList(): Map<string, Stammbaum> {
    return this.stammbaumList;
  }

  getSingleTree(id: string | null): Stammbaum {
    let stammbaum;
    if (id !== null) {
     stammbaum = this.stammbaumList.get(id);
    }
    if (stammbaum) {
      return stammbaum;
    }
    throw new Error('invalid Tree ID');
  }
}
