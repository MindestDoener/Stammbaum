import { Person } from '../../types/person';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TimeStruct } from '../../types/time';

export interface FamilyTreeModel {
  id: number;
  config: Config
  username: string;
}

export interface CreateFamilyTreeModel {
  config: Config;
  username: string;
}

export interface Config {
  name: string;
  persons: [number, Person][];
  lastChanged: {
    date: NgbDateStruct;
    time: TimeStruct;
  };
}
