import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Person } from './person';
import { Time } from './time';

export interface FamilyTree {
    name: string;
    persons: Map<number, Person>;
    id: string;
    lastChanged: { date: NgbDate, time: Time };
}
