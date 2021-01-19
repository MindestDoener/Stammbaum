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
    birthDate: new FormControl(),
    deathDate: new FormControl()
  });

  stammbaum?: Stammbaum;

  constructor(private stammbaumService: StammbaumServiceService) {
  }

  ngOnInit(): void {
  }

  onCreateStammbaum(name: string): void {
    this.stammbaum = this.stammbaumService.createEmptyStammbaum(name);
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
