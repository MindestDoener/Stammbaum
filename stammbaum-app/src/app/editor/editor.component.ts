import {Component, OnInit} from '@angular/core';
import {StammbaumServiceService} from '../shared/stammbaum-service.service';
import {CreatePersonRequest, Person, Stammbaum} from '../shared/types';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  addPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl()
  });

  createStammbaumForm = new FormGroup({
    treeName: new FormControl()
  });

  stammbaum?: Stammbaum;

  genders = ['Male', 'Female'];

  constructor(private stammbaumService: StammbaumServiceService) {
  }

  ngOnInit(): void {
  }

  onCreateStammbaum(): void {
    this.stammbaum = this.stammbaumService.createEmptyStammbaum(this.createStammbaumForm.controls.treeName.value);
  }

  onAddPerson(): void {
    const personRequest: CreatePersonRequest = {...this.addPersonForm.value};
    this.stammbaumService.addPersonToStammbaum(personRequest);
    this.addPersonForm.reset();
  }

  onDeletePerson(person: Person): void {
    this.stammbaumService.deletePersonFromStammbaum(person);
  }

}
