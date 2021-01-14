export interface Stammbaum {
  name: string;
  persons: Person[];
}

export interface Person {
  id: number;
  name: string;
  surName: string;
  deathDate?: Date;
  birthDate: Date;
  children?: Person[];
}
