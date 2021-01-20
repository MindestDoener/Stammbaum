export interface Stammbaum {
  name: string;
  persons: Person[];
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: Date;
  birthDate: Date;
  children?: Person[];
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
  MALE,
  FEMALE
}
