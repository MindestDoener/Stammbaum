import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StammbaumServiceService} from '../shared/stammbaum-service.service';
import {convertDate, CreatePersonRequest, Gender, Person, Stammbaum} from '../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuContentComponent} from './context-menu-content/context-menu-content.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit{

  constructor(private stammbaumService: StammbaumServiceService, private modalService: NgbModal, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.stammbaum = this.stammbaumService.getSingleTree(params.get('id'));
  }

  @ViewChild('graphContainer') graphContainer: ElementRef | undefined;

  addPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl()
  });

  stammbaum?: Stammbaum;

  genders = ['Male', 'Female', 'Diverse'];



  private static getValue(person: Person): string {
    if (person.deathDate) {
      return person.firstName + ' ' + person.lastName +
        '\n * ' + convertDate(person.birthDate) + ' - † ' + convertDate(person.deathDate);
    }
    return person.firstName + ' ' + person.lastName + '\n * ' + convertDate(person.birthDate);
  }

  // initDiagram(): void {
  //   this.graph = new mx.mxGraph(this.graphContainer?.nativeElement);
  //   if (!this.graph) {
  //     return;
  //   }
  //
  //   try {
  //     this.graph.getModel().beginUpdate();
  //     this.graph.addListener(mx.mxEvent.DOUBLE_CLICK, this.doubleClickEvent);
  //   } finally {
  //     this.graph.getModel().endUpdate();
  //     new mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
  //   }
  // }

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
    personRequest.gender = Gender.getById(this.addPersonForm.value.gender);
    const person = this.stammbaumService.addPerson(personRequest);
    this.addPersonForm.reset();

    // if (!(this.graph && this.stammbaum)) {
    //   return;
    // }
    //
    // try {
    //   const parent = this.graph.getDefaultParent();
    //   this.graph.getModel().beginUpdate();
    //
    //   person.cell = this.graph.insertVertex(
    //     parent,
    //     person.id.toString(),
    //     EditorComponent.getValue(person),
    //     0,
    //     0,
    //     200,
    //     80,
    //     'rounded=1;html=1;arcSize=50;fillColor=#F9F9F9;strokeWidth=3;strokeColor=' + person.gender.color
    //   );
    //
    // } finally {
    //   this.graph.getModel().endUpdate();
    //   new mx.mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    // }
  }

  onOpenContextMenu(person: Person): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent, {size: 'lg'});
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => {
      this.stammbaumService.deletePerson(personToDelete);
      // this.graph?.removeCells([personToDelete.cell]);
      modalRef.close();
    });
    modalRef.componentInstance.updatePerson.subscribe(this.updatePersonEvent);
  }

  updatePersonEvent = (personToUpdate: Person) => {
    this.stammbaumService.updatePerson(personToUpdate);
    // if (personToUpdate.cell != null && this.graph) {
    //   const parent = this.graph.getDefaultParent();
    //   try {
    //     this.graph.getModel().beginUpdate();
    //
    //     this.graph.model.setValue(personToUpdate.cell, EditorComponent.getValue(personToUpdate));
    //     this.graph.model.setStyle(personToUpdate.cell,
    //       'rounded=1;arcSize=50;fillColor=#F9F9F9;strokeWidth=3;strokeColor=' + personToUpdate.gender.color);
    //     if (personToUpdate.children && personToUpdate.children.length > 0) {
    //       this.graph.model.getEdges(personToUpdate.cell, false, true, false)
    //         .forEach(edge => this.graph?.model.remove(edge));
    //       for (const child of personToUpdate.children) {
    //         this.graph.insertEdge(
    //           parent,
    //           personToUpdate.id.toString() + child.id.toString(),
    //           '',
    //           personToUpdate.cell,
    //           // tslint:disable-next-line:no-non-null-assertion
    //           child.cell!,
    //           'strokeColor=#B3B3B3;');
    //       }
    //     }
    //   } finally {
    //     this.graph.getModel().endUpdate();
    //     new mx.mxHierarchicalLayout(this.graph).execute(parent);
    //   }
    // }
  }
}
