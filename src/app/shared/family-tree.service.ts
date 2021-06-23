import { Injectable } from '@angular/core';
import { CreatePersonRequest, FamilyTree, getNow, getToday, makeUUID, Person, SortMode } from './types';
import { TestData } from './testData';

@Injectable({
  providedIn: 'root',
})
export class FamilyTreeService {

  familyTreeMap: Map<string, FamilyTree> = TestData.testList;

  private static sortByLastChanged(list: FamilyTree[]): FamilyTree[] {
    return list.sort((a, b) => {
      if (a.lastChanged.date.before(b.lastChanged.date)) {
        return 1;
      }
      if (a.lastChanged.date.after(b.lastChanged.date)) {
        return -1;
      }
      if (a.lastChanged.time.before(b.lastChanged.time)) {
        return 1;
      }
      if (a.lastChanged.time.after(b.lastChanged.time)) {
        return -1;
      }
      return 0;
    });
  }

  private static sortByNameAlphabetic(list: FamilyTree[]): FamilyTree[] {
    return list.sort((a,b) => {
      return a.name.localeCompare(b.name);
    });
  }

  private static sortByNumberOfPersons(list: FamilyTree[]): FamilyTree[] {
    return list.sort((a,b) => {
      return b.persons.size - a.persons.size;
    });
  }

  createEmptyFamilyTree(name: string, id: string): void {
    const familyTree = {
      name,
      persons: new Map<number, Person>(),
      id,
      lastChanged: { date: getToday(), time: getNow() },
    };

    this.familyTreeMap.set(id, familyTree);
  }

  deleteFamilyTree(id: string): void {
    this.familyTreeMap.delete(id);
  }

  addPerson(personRequest: CreatePersonRequest, treeId: string): Person {
    const person = {
      id: this.makeUUID(treeId),
      ...personRequest,
    };
    if (this.familyTreeMap !== undefined) {
      this.familyTreeMap.get(treeId)?.persons.set(person.id, person);
    }
    this.updateLastChanged(treeId);
    return person;
  }

  // Takes Person as input and changes data of person in map with same id to data of person in parameter
  updatePerson(person: Person, treeId: string): void {
    if (this.familyTreeMap !== undefined) {
      this.familyTreeMap.get(treeId)?.persons.set(person.id, person);
    }
    this.updateLastChanged(treeId);
  }

  deletePerson(person: Person, treeId: string): void {
    if (this.familyTreeMap !== undefined) {
      this.familyTreeMap.get(treeId)?.persons.delete(person.id);
    }
    this.updateLastChanged(treeId);
  }

  getPersonById(id: number, treeId: string): Person | undefined {
    if (this.familyTreeMap !== undefined) {
      return this.familyTreeMap.get(treeId)?.persons.get(id);
    }
    return undefined;
  }

  getTreeMap(): Map<string, FamilyTree> {
    return this.familyTreeMap;
  }

  getTreeList(): FamilyTree[] {
    return Array.from(this.familyTreeMap.values());
  }

  getTreeListSorted(sortMode: SortMode): FamilyTree[] {
    const list = this.getTreeList();
    switch (sortMode) {
      case SortMode.lastChanged:
        return FamilyTreeService.sortByLastChanged(list);
      case SortMode.alphabetic:
        return FamilyTreeService.sortByNameAlphabetic(list);
      case SortMode.persons:
        return FamilyTreeService.sortByNumberOfPersons(list);
    }
  }

  getSingleTree(id: string | null): FamilyTree {
    let familyTree;
    if (id !== null) {
      familyTree = this.familyTreeMap.get(id);
    }
    if (familyTree) {
      return familyTree;
    }
    throw new Error('invalid Tree ID');
  }

  updateLastChanged(treeId: string): void {
    const tree = this.familyTreeMap.get(treeId);
    if (tree) {
      tree.lastChanged = { date: getToday(), time: getNow() };
    }
  }

  private makeUUID(treeId: string): number {
    const num = makeUUID();
    // check for duplicate ids
    if (this.familyTreeMap?.get(treeId)) {
      if (this.familyTreeMap.get(treeId)?.persons.has(num)) {
        return this.makeUUID(treeId);
      }
    }
    return num;
  }
}
