import {mxgraph} from 'mxgraph';
import mxCell = mxgraph.mxCell;

export interface Stammbaum {
  name: string;
  persons: Map<number, Person>;
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: Date;
  birthDate: Date;
  children?: Person[];
  cell?: mxCell;
}

export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: Date;
  birthDate: Date;
  children?: Person[];
}

export enum Gender {
  MALE = '#86e1fc',
  FEMALE = '#eca7ff'
}
