import { Injectable } from '@angular/core';
import { CreatePersonRequest, Person, FamilyTree } from './types';

@Injectable({
  providedIn: 'root',
})
export class FamilyTreeService {
  familyTreeList: Map<string, FamilyTree> = new Map<string, FamilyTree>([
    ['0', { id: '0', name: 'Stammbaum1', persons: new Map() }],
    ['1', { id: '1', name: 'Stammbaum2', persons: new Map() }],
    ['2', { id: '2', name: 'Stammbaum3', persons: new Map() }],
    ['3', { id: '3', name: 'Stammbaum4', persons: new Map() }],
  ]);

  createEmptyFamilyTree(name: string, id: string): void {
    const familyTree = {
      name,
      persons: new Map<number, Person>(),
      id,
    };

    this.familyTreeList.set(id, familyTree);
  }

  addPerson(personRequest: CreatePersonRequest, treeId: string): Person {
    const person = {
      id: this.makeUUID(treeId),
      ...personRequest,
    };
    if (this.familyTreeList !== undefined) {
      this.familyTreeList.get(treeId)?.persons.set(person.id, person);
    }
    return person;
  }

  // Takes Person as input and changes data of person in map with same id to data of person in parameter
  updatePerson(person: Person, treeId: string): void {
    if (this.familyTreeList !== undefined) {
      this.familyTreeList.get(treeId)?.persons.set(person.id, person);
    }
  }

  deletePerson(person: Person, treeId: string): void {
    if (this.familyTreeList !== undefined) {
      this.familyTreeList.get(treeId)?.persons.delete(person.id);
    }
  }

  getPersonById(id: number, treeId: string): Person | undefined {
    if (this.familyTreeList !== undefined) {
      return this.familyTreeList.get(treeId)?.persons.get(id);
    }
    return undefined;
  }

  getTreeList(): Map<string, FamilyTree> {
    return this.familyTreeList;
  }

  getSingleTree(id: string | null): FamilyTree {
    let familyTree;
    if (id !== null) {
      familyTree = this.familyTreeList.get(id);
    }
    if (familyTree) {
      return familyTree;
    }
    throw new Error('invalid Tree ID');
  }

  private makeUUID(treeId: string): number {
    let uuid = '';
    for (let i = 0; i < 10; i++) {
      uuid += Math.round(Math.random() * 9).toString();
    }
    const num = parseInt(uuid, 10);
    // check for duplicate ids
    if (this.familyTreeList?.get(treeId)) {
      if (this.familyTreeList.get(treeId)?.persons.has(num)) {
        return this.makeUUID(treeId);
      }
    }
    return num;
  }
}
