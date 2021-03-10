import {Component, ElementRef, ViewChild} from '@angular/core';
import {StammbaumServiceService} from '../shared/stammbaum-service.service';
import {CreatePersonRequest, Gender, Person, Stammbaum} from '../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuContentComponent} from './context-menu-content/context-menu-content.component';
import {mxgraph} from 'mxgraph';

declare var require: any;

const mx = require('mxgraph')({
  mxImageBasePath: 'assets/mxgraph/images',
  mxBasePath: 'assets/mxgraph'
});


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @ViewChild('graphContainer') graphContainer: ElementRef | undefined;

  createStammbaumForm = new FormGroup({
    treeName: new FormControl()
  });

  addPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl()
  });

  stammbaum?: Stammbaum;

  graph?: mxgraph.mxGraph;

  genders = ['Male', 'Female'];

  constructor(private stammbaumService: StammbaumServiceService, private modalService: NgbModal) {
  }

  onCreateStammbaum(): void {
    this.stammbaum = this.stammbaumService.createEmptyStammbaum(this.createStammbaumForm.controls.treeName.value);
    this.initDiagram();
  }

  initDiagram(): void {
    this.graph = new mx.mxGraph(this.graphContainer?.nativeElement);
    if (!this.graph) {
      return;
    }

    try {
      this.graph.getModel().beginUpdate();
      this.graph.addListener(mx.mxEvent.DOUBLE_CLICK, this.doubleClickEvent);
    } finally {
      this.graph.getModel().endUpdate();
      new mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
  }

  doubleClickEvent = (sender: any, event: any) => {
    const cell = event.getProperty('cell');
    if (cell != null) {
      const person = this.stammbaumService.getPersonById(+cell.id);
      if (person) {
        this.onOpenContextMenu(person);
      }
    }
    event.consume();
  }

  onAddPerson(): void {
    const personRequest: CreatePersonRequest = {...this.addPersonForm.value};
    personRequest.gender = (this.addPersonForm.value.gender === 0) ? Gender.MALE : Gender.FEMALE;
    const person = this.stammbaumService.addPerson(personRequest);
    this.addPersonForm.reset();

    if (!(this.graph && this.stammbaum)) {
      return;
    }

    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();

      person.cell = this.graph.insertVertex(
        parent,
        person.id.toString(),
        person.firstName + ' ' + person.lastName,
        0,
        0,
        200,
        80,
        'fillColor=' + person.gender
      );

    } finally {
      this.graph.getModel().endUpdate();
      new mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
  }

  onOpenContextMenu(person: Person): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent);
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => {
      this.stammbaumService.deletePerson(personToDelete);
      this.graph?.removeCells([personToDelete.cell]);
      modalRef.close();
    });
    modalRef.componentInstance.updatePerson.subscribe(this.updatePersonEvent);
  }

  updatePersonEvent = (personToUpdate: Person) => {
    this.stammbaumService.updatePerson(personToUpdate);
    if (personToUpdate.cell != null) {
      this.graph?.model.setValue(personToUpdate.cell, personToUpdate.firstName + ' ' + personToUpdate.lastName);
      this.graph?.model.setStyle(personToUpdate.cell, 'fillColor=' + personToUpdate.gender);
    }
  }
}
