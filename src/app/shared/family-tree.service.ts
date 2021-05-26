import { Injectable } from '@angular/core';
import { CreatePersonRequest, FamilyTree, makeUUID, Person } from './types';
import { TestData } from './testData';

@Injectable({
  providedIn: 'root',
})
export class FamilyTreeService {

  familyTreeList: Map<string, FamilyTree> = TestData.testList;

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
    const num = makeUUID();
    // check for duplicate ids
    if (this.familyTreeList?.get(treeId)) {
      if (this.familyTreeList.get(treeId)?.persons.has(num)) {
        return this.makeUUID(treeId);
      }
    }
    return num;
  }
}
