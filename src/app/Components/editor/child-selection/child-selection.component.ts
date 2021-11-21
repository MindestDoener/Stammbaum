import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/shared/types/person';

@Component({
  selector: 'app-child-selection',
  templateUrl: './child-selection.component.html',
  styleUrls: ['./child-selection.component.scss'],
})
export class ChildSelectionComponent implements OnInit {
  @Input() set persons(input: Map<number, Person> | undefined) {
    this.allPersons = input && Array.from(input.values());
  }

  @Input()
  selectedPerson: Person | undefined;

  @Input()
  isUpdateMode = false;

  @Input()
  editPersonForm?: FormGroup;

  @Output()
  valueChange: EventEmitter<number[]> = new EventEmitter();

  allPersons?: Person[] = [];

  possiblePersons?: Person[];

  childrenOfPerson: Person[] = [];

  selectedChildrenIds: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.init();
  }

  init():void {
    if (this.editPersonForm) {
      this.editPersonForm?.statusChanges.subscribe((status) => {
        if (status === 'VALID') {
          this.filterPossibleChildren();
        }
        return status;
      });
    }
    if (this.selectedPerson) {
      this.selectedChildrenIds = this.selectedPerson.children || [];
      this.getPersonsChildren();
      this.filterPossibleChildren();
    }
  }

  reset(): void {
    this.possiblePersons = []
    this.selectedChildrenIds = []
    this.childrenOfPerson = []
    this.init()
  }

  removeChild(child: Person): void {
    this.selectedChildrenIds = this.selectedChildrenIds.filter(
      (id) => id !== child.id
    );
    this.valueChange.emit(this.selectedChildrenIds);
    this.getPersonsChildren();
    this.possiblePersons?.push(child);
  }

  addChild(child: Person): void {
    this.selectedChildrenIds.push(child.id);
    this.valueChange.emit(this.selectedChildrenIds);
    this.getPersonsChildren();
    this.possiblePersons?.splice(this.possiblePersons.indexOf(child), 1);
  }

  getPersonsChildren(): void {
    this.childrenOfPerson = [];
    this.selectedChildrenIds.forEach((child) => {
      if (this.allPersons) {
        const childAsPerson = this.allPersons?.find(
          (person) => person.id === child
        );
        if (childAsPerson) {
          this.childrenOfPerson.push(childAsPerson);
        }
      }
    });
  }

  filterPossibleChildren(): void {
    this.possiblePersons = this.allPersons
      ?.filter((person) => this.isPossibleChild(person))
      .filter((person) => this.selectedPerson?.id !== person.id)
      .filter((person) =>
        this.childrenOfPerson.find((child) => child.id === person.id)
          ? false
          : true
      );
  }

  isPossibleChild(person: Person): boolean {
    const formBirthDay = NgbDate.from(this.editPersonForm?.value.birthDate);
    const personBirthDay = NgbDate.from(person.birthDate);
    return (
      (formBirthDay && personBirthDay && formBirthDay.before(personBirthDay)) ||
      false
    );
  }

  onSearchInput(event: any): void {
    if (event.target.value === '') {
      this.filterPossibleChildren();
    } else {
      this.possiblePersons = this.possiblePersons?.filter(
        (person) =>
          person.firstName
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) > -1 ||
          person.lastName
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) > -1
      );
    }
  }
}
