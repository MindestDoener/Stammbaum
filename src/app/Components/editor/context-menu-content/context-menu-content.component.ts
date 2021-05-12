import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Gender, Person, Stammbaum} from '../../../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {StammbaumServiceService} from '../../../shared/stammbaum-service.service';

@Component({
  selector: 'app-context-menu-content',
  templateUrl: './context-menu-content.component.html',
  styleUrls: ['./context-menu-content.component.scss']
})
export class ContextMenuContentComponent implements AfterContentInit {

  @Input()
  person!: Person;

  @Input()
  stammbaum!: Stammbaum;

  @Output()
  deletePerson: EventEmitter<Person> = new EventEmitter();

  @Output()
  updatePerson: EventEmitter<Person> = new EventEmitter();

  genders = ['Male', 'Female', 'Diverse'];

  editPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl(),
    children: new FormControl([])
  });

  possibleChildren: Person[] = [];

  constructor(public activeModal: NgbActiveModal, private stammbaumService: StammbaumServiceService) {
  }

  ngAfterContentInit(): void {
    this.possibleChildren = Array.from(this.stammbaum.persons.values()).filter(it => this.isPossibleChild(it));
    this.setForm();
  }

  isPossibleChild(person: Person): boolean {
    if (person.id === this.person.id) { // child cant be the person itself
      return false;
    }
    if (person.children && person.children.indexOf(this.person) > -1) { // child cant be parent of person
      return false;
    }
    if (this.person.birthDate > person.birthDate) { // child cant be born before person
      return false;
    }
    return true;
  }

  private setForm(): void {
    this.editPersonForm.patchValue(this.person);
    this.editPersonForm.patchValue({gender: this.person.gender.id});
    if (this.person.children) {
      this.editPersonForm.patchValue({children: this.person.children.map(person => person.id)});
    }
  }

  onDeletePerson(): void {
    this.deletePerson.emit(this.person);
  }

  onUpdatePerson(): void {
    this.person.firstName = this.editPersonForm.value.firstName;
    this.person.lastName = this.editPersonForm.value.lastName;
    this.person.gender = Gender.getById(this.editPersonForm.value.gender);
    this.person.birthDate = this.editPersonForm.value.birthDate;
    this.person.deathDate = this.editPersonForm.value.deathDate;
    this.person.children = this.editPersonForm.value.children
      .map((id: number) => this.stammbaumService.getPersonById(id, this.stammbaum.id));
    this.updatePerson.emit(this.person);
  }
}
