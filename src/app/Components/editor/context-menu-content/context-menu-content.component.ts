import { AfterContentInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { FamilyTree } from '../../../shared/types/familyTree';
import { Gender } from '../../../shared/types/gender';
import { Person } from '../../../shared/types/person';
import { CreatePersonRequest } from '../../../shared/types/createPersonRequest';
import { DateConverter } from '../../../shared/types/dateConverter';
import { ChildSelectionComponent } from '../child-selection/child-selection.component';

@Component({
  selector: 'app-context-menu-content',
  templateUrl: './context-menu-content.component.html',
  styleUrls: ['./context-menu-content.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: DateConverter }],
})
export class ContextMenuContentComponent implements AfterContentInit {
  @ViewChild('childSelectionComponent')
  multiselect!: ChildSelectionComponent;

  @Input()
  person?: Person;

  @Input()
  mode!: 'ADD' | 'UPDATE';

  @Input()
  familyTree!: FamilyTree;

  @Output()
  deletePerson: EventEmitter<Person> = new EventEmitter();

  @Output()
  updatePerson: EventEmitter<Person> = new EventEmitter();

  @Output()
  addPerson: EventEmitter<CreatePersonRequest> = new EventEmitter();

  genders = ['Male', 'Female', 'Diverse'];

  editPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(NgbDate),
    deathDate: new FormControl(NgbDate.from(null)), // needed for deathDate to be optional
  });

  children: number[] = [];

  addMoreCheckBox = new FormControl();

  possibleChildren: { label: string; id: number }[] = [];

  possibleSpouses: Person[] = [];
  selectedSpouse?: number;

  today: NgbDateStruct = this.calender.getToday();
  minBirthDate: NgbDateStruct = new NgbDate(1000, 1, 1); // should be enough for the start (can be changed if needed)

  constructor(
    public activeModal: NgbActiveModal,
    private calender: NgbCalendar
  ) {}

  searchLastNames: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) => {
    const allLastNames: string[] = Array.from(
      this.familyTree.persons.values()
    ).map((person) => person.lastName);
    const lastNames: string[] = [...new Set(allLastNames)];
    return text$.pipe(
      distinctUntilChanged(),
      map((term) =>
        lastNames
          .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
      )
    );
  };

  ngAfterContentInit(): void {
    if (this.person) {
      this.editPersonForm.patchValue(this.person);
      this.selectedSpouse = this.person.spouse;
    }
    this.possibleSpouses = this.getPossibleSpouses();
    this.setForm();
  }

  onAddPerson(): void {
    const newPerson: CreatePersonRequest = {
      ...this.editPersonForm.value,
      children: this.children,
      gender: Gender.getById(this.editPersonForm.value.gender),
      spouse: this.selectedSpouse,
    };

    newPerson.birthDate =
      NgbDate.from(this.editPersonForm.value.birthDate) || new NgbDate(0, 0, 0);

    newPerson.deathDate = this.editPersonForm.value.deathDate
      ? NgbDate.from(this.editPersonForm.value.deathDate) || undefined
      : undefined;
    this.addPerson.emit(newPerson);
    if (this.addMoreCheckBox.value) {
      this.editPersonForm.reset();
      this.children = [];
      this.multiselect.reset();
      this.selectedSpouse = undefined;
      this.possibleSpouses = this.getPossibleSpouses();
    } else {
      this.activeModal.close();
    }
  }

  onDeletePerson(): void {
    this.deletePerson.emit(this.person);
  }

  onUpdatePerson(): void {
    if (!this.person) {
      return;
    }
    this.person.firstName = this.editPersonForm.value.firstName;
    this.person.lastName = this.editPersonForm.value.lastName;
    this.person.gender = Gender.getById(this.editPersonForm.value.gender);
    this.person.birthDate = this.editPersonForm.value.birthDate;
    this.person.deathDate = this.editPersonForm.value.deathDate;
    this.person.children = this.children;
    this.person.spouse = this.selectedSpouse;
    this.updatePerson.emit(this.person);
  }

  isUpdateMode = () => {
    return this.mode === 'UPDATE';
  };

  setChildren(event: number[]): void {
    this.children = event;
  }

  isPossibleSpouse(person: Person): boolean {
    const isSamePerson = person.id === this.person?.id;
    const isChild = this.person?.children?.find((child) => child === person.id)
      ? true
      : !!this.children.find((child) => child === person.id);
    const isMarriedToOther = person.spouse && person.spouse !== this.person?.id
    return !isSamePerson && !isChild && !isMarriedToOther;
  }

  setSpouse(event: any): void {
    this.selectedSpouse = event.target.value === "0" ? undefined : parseInt(event.target.value,10);
  }

  private getPossibleSpouses(): Person[] {
    return Array.from(this.familyTree.persons.values()).filter((it) =>
      this.isPossibleSpouse(it)
    );
  }

  private setForm(): void {
    if (!this.person) {
      return;
    }
    this.editPersonForm.patchValue(this.person);
    this.editPersonForm.patchValue({ gender: this.person.gender.id });
    if (this.person.children) {
      this.children = this.person.children;
    }
  }
}
