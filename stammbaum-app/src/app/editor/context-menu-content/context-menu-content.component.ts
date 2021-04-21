import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Gender, Person, Stammbaum} from '../../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {StammbaumServiceService} from '../../shared/stammbaum-service.service';

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

  genders = ['Male', 'Female', 'Diverse'];

  editPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl(),
    children: new FormControl([])
  });

  stammbaum?: Stammbaum;

  constructor(public activeModal: NgbActiveModal, private stammbaumService: StammbaumServiceService) {
    this.stammbaum = stammbaumService.stammbaum;
  }

  ngAfterContentInit(): void {
    this.setForm();
  }

  private setForm(): void {
    this.editPersonForm.patchValue(this.person);
    this.editPersonForm.patchValue({gender: this.person.gender.id});
    if (this.person.children) {
      this.editPersonForm.patchValue({children: this.person.children.map(person => person.id)});
    }
    console.log('Form set');
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
    this.person.children = this.editPersonForm.value.children.map((id: number) => this.stammbaumService.getPersonById(id));
    console.log(this.person.children);
    this.updatePerson.emit(this.person);
  }
}
