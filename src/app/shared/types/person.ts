import { Gender } from './gender';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Node } from '@swimlane/ngx-graph';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  deathDate?: NgbDate;
  birthDate: NgbDate;
  children?: number[];
  spouce?: number;
  node?: Node;
}
