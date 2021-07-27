import { Injectable } from '@angular/core';
import { TestData } from './types/test/testData';
import { FamilyTree } from './types/familyTree';
import { Person } from './types/person';
import { CreatePersonRequest } from './types/createPersonRequest';
import { SortMode } from './types/sortMode';
import { makeUUID } from './types/uuid';
import { getNow, getToday, Time } from './types/time';
import { HttpClient } from '@angular/common/http';
import { apiHttpOptions, apiUrl } from './api/api-settings';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';

interface FamilyTreeResponseType {
    id: number;
    config: {
        name: string;
        persons: [Person, number][];
        lastChanged: {
            date: {
                year: number;
                month: number;
                day: number;
            };
            time: {
                hours: number;
                minutes: number;
                seconds: number;
            };
        };
    };
    username: string;
}

interface CreateFamilyTreeType {
    config: {
        name: string;
        persons: [Person, number][];
        lastChanged: {
            date: {
                year: number;
                month: number;
                day: number;
            };
            time: {
                hours: number;
                minutes: number;
                seconds: number;
            };
        };
    };
    username: string;
}

@Injectable({
    providedIn: 'root',
})
export class FamilyTreeService {
    constructor(private http: HttpClient) {}

    familyTreeMap: Map<string, FamilyTree> = TestData.testList;

    private static sortByLastChanged(list: FamilyTree[]): FamilyTree[] {
        return list.sort((a, b) => {
            if (a && b) {
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
            }
            return 0;
        });
    }

    private static sortByNameAlphabetic(list: FamilyTree[]): FamilyTree[] {
        return list.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    private static sortByNumberOfPersons(list: FamilyTree[]): FamilyTree[] {
        return list.sort((a, b) => {
            return b.persons.size - a.persons.size;
        });
    }

    createEmptyFamilyTree(name: string): Observable<FamilyTreeResponseType> {
        const familyTree: CreateFamilyTreeType = {
          config: {
            name,
            persons: Array.from(new Map<Person, number>()),
            lastChanged: { date: getToday(), time: { hours: getNow().hours, minutes: getNow().minutes, seconds: getNow().seconds || 0 } },
            },
          username: 'Peter01'
        };
        return this.http
            .post<FamilyTreeResponseType>(
                apiUrl + 'trees',
                familyTree,
                apiHttpOptions
            )
            .pipe(catchError((error) => throwError('Error', error)));
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

    getTreeList(): Observable<FamilyTree[]> {
        return this.http
            .get<FamilyTreeResponseType[]>(
                apiUrl + 'trees/user/' + 'Peter01',
                apiHttpOptions
            )
            .pipe(
              map((trees) =>
                  trees.map(tree => this.mapResponseToFamilyTree(tree))
                )
            );
    }

    getTreeListSorted(sortMode: SortMode): Observable<FamilyTree[]> {
        return this.getTreeList().pipe(
            map((list) => {
                switch (sortMode) {
                    case SortMode.lastChanged:
                        return FamilyTreeService.sortByLastChanged(list);
                    case SortMode.alphabetic:
                        return FamilyTreeService.sortByNameAlphabetic(list);
                    case SortMode.persons:
                        return FamilyTreeService.sortByNumberOfPersons(list);
                }
            })
        );
    }

    getSingleTree(id: string | null): Observable<FamilyTree> {
      return this.http
      .get<FamilyTreeResponseType>(
          apiUrl + 'trees/' + id,
          apiHttpOptions
      )
      .pipe(
        map(tree =>
            this.mapResponseToFamilyTree(tree)
          )
      );
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
  
  private mapResponseToFamilyTree(tree: FamilyTreeResponseType): FamilyTree {
      const lastChanged = tree.config.lastChanged;
      const personMap: Map<number, Person> = new Map();
      tree.config.persons.forEach((person) => {
          personMap.set(person[1], person[0]);
      });
      return {
          ...tree.config,
          id: tree.id.toString(),
          persons: personMap,
          lastChanged: {
              date: new NgbDate(
                  lastChanged.date.year,
                  lastChanged.date.month,
                  lastChanged.date.day
              ),
              time: new Time(
                  lastChanged.time.hours,
                  lastChanged.time.minutes,
                  lastChanged.time.seconds
              ),
          },
      };
  }
}
