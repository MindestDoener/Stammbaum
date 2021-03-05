import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StammbaumServiceService} from '../shared/stammbaum-service.service';
import {CreatePersonRequest, Person, Stammbaum} from '../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuContentComponent} from './context-menu-content/context-menu-content.component';
import {mxgraph} from 'mxgraph';
import mxRubberband = mxgraph.mxRubberband;

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
export class EditorComponent implements OnInit {

  @ViewChild('graphContainer') graphContainer: ElementRef | undefined;

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
    this.graphContainer?.nativeElement.onChange(this.initDiagram());
  }

  initDiagram(): void {
    const newGraph = new mx.mxGraph(this.graphContainer?.nativeElement);
    // tslint:disable-next-line:no-unused-expression
    new mxRubberband(newGraph);
    try {
      const parent = newGraph.getDefaultParent();
      newGraph.getModel().beginUpdate();
      const vertex1 = newGraph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      const vertex2 = newGraph.insertVertex(parent, '2', 'Vertex2', 0, 0, 200, 80);
      newGraph.insertEdge(parent, '', '', vertex1, vertex2, 'endArrow=none');
    } finally {
      newGraph.getModel().endUpdate();
      new mx.mxHierarchicalLayout(newGraph).execute(newGraph.getDefaultParent());
    }
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
