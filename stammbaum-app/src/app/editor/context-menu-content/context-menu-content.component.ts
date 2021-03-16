import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Gender, Person} from '../../shared/types';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-context-menu-content',
  templateUrl: './context-menu-content.component.html',
  styleUrls: ['./context-menu-content.component.scss']
})
export class ContextMenuContentComponent implements AfterContentInit {

  @Input()
  person!: Person;

  @Output()
  deletePerson: EventEmitter<Person> = new EventEmitter();

  @Output()
  updatePerson: EventEmitter<Person> = new EventEmitter();

  genders = ['Male', 'Female'];

  editPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl()
  });

  constructor(public activeModal: NgbActiveModal) {
  }

  ngAfterContentInit(): void {
    this.setForm();
  }

  private setForm(): void {
    this.editPersonForm.patchValue(this.person);
    this.editPersonForm.patchValue({gender: (this.person.gender === Gender.MALE) ? 0 : 1});
    console.log('Form set');
  }

  onDeletePerson(): void {
    this.deletePerson.emit(this.person);
  }

  onUpdatePerson(): void {
    this.person.firstName = this.editPersonForm.value.firstName;
    this.person.lastName = this.editPersonForm.value.lastName;
    this.person.gender = this.editPersonForm.value.gender === 0 ? Gender.MALE : Gender.FEMALE;
    this.person.birthDate = this.editPersonForm.value.birthDate;
    this.person.deathDate = this.editPersonForm.value.deathDate;
    this.updatePerson.emit(this.person);
  }
}
