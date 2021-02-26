import {Component, OnInit} from '@angular/core';
import {StammbaumServiceService} from '../shared/stammbaum-service.service';
import {CreatePersonRequest, Person, Stammbaum} from '../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuContentComponent} from './context-menu-content/context-menu-content.component';

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

  constructor(private stammbaumService: StammbaumServiceService, private modalService: NgbModal) {
  }

  onCreateStammbaum(): void {
    this.stammbaum = this.stammbaumService.createEmptyStammbaum(this.createStammbaumForm.controls.treeName.value);
  }

  onAddPerson(): void {
    const personRequest: CreatePersonRequest = {...this.addPersonForm.value};
    console.log(personRequest);
    this.stammbaumService.addPerson(personRequest);
    this.addPersonForm.reset();
  }

  onOpenContextMenu(person: Person): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent);
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => {
      this.stammbaumService.deletePerson(personToDelete);
      modalRef.close();
    });
    modalRef.componentInstance.updatePerson.subscribe((personToUpdate: Person) => {
      this.stammbaumService.updatePerson(personToUpdate);
    });
  }

  ngOnInit(): void {
  }

}
