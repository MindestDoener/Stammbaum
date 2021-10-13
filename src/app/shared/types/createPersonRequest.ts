import { Gender } from './gender';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Person } from './person';

export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: NgbDate;
  birthDate: NgbDate;
  children?: number[];
  spouce?: number;
}
