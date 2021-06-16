import { Node } from '@swimlane/ngx-graph';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

export interface FamilyTree {
  name: string;
  persons: Map<number, Person>;
  id: string;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: NgbDate;
  birthDate: NgbDate;
  children?: Person[];
  node?: Node;
}

export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: NgbDate;
  birthDate: NgbDate;
  children?: Person[];
}

export class Gender {
  public static readonly MALE = new Gender(0, '#86e1fc');
  public static readonly FEMALE = new Gender(1, '#eca7ff');
  public static readonly DIVERSE = new Gender(2, '#b3ec69');
  public static readonly UNKNOWN = new Gender(-1, '#000000');

  private constructor(public readonly id: number, public readonly color: string) {
  }

  public static getById(id: number): Gender {
    switch (id) {
      case 0:
        return this.MALE;
      case 1:
        return this.FEMALE;
      case 2:
        return this.DIVERSE;
      default:
        return this.UNKNOWN;
    }
  }
}

export function makeUUID(): number {
  let uuid = '';
  for (let i = 0; i < 10; i++) {
    uuid += Math.round(Math.random() * 9).toString();
  }
  return parseInt(uuid, 10);
}

@Injectable()
export class DateConverter extends NgbDateParserFormatter {

  readonly DELIMITER = '.';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
