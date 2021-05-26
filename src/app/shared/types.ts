import * as ngx from '@swimlane/ngx-graph';

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
  deathDate?: Date;
  birthDate: Date;
  children?: Person[];
  node?: ngx.Node;
}

export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: Date;
  birthDate: Date;
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

export function convertDate(date: Date): string {
  const temp = date.toString().split('-');
  return `${temp[2]}.${temp[1]}.${temp[0]}`;
}
