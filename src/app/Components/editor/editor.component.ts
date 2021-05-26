import { Component } from '@angular/core';
import { FamilyTreeService } from '../../shared/family-tree.service';
import { CreatePersonRequest, FamilyTree, Gender, Person } from '../../shared/types';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuContentComponent } from './context-menu-content/context-menu-content.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Node } from '@swimlane/ngx-graph';
import { GraphManager } from './GraphManager';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {

  addPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl(),
  });
  familyTree!: FamilyTree;
  graphManager: GraphManager = new GraphManager();
  genders = ['Männlich', 'Weiblich', 'Divers'];

  constructor(private familyTreeService: FamilyTreeService, private modalService: NgbModal,
              private route: ActivatedRoute, private router: Router) {

    const params = this.route.snapshot.paramMap;
    try {
      this.familyTree = this.familyTreeService.getSingleTree(params.get('id'));
      this.graphManager.init(this.familyTree)
    } catch (e) {
      router.navigate(['/home']); // redirect home when invalid tree id
    }

  }

  dblClickEvent = (node: Node) => {
    const person = this.familyTreeService.getPersonById(+node.id, this.familyTree.id);
    if (person) {
      this.onOpenContextMenu(person);
    }
  };

  toggleTooltip = (node: Node) => {
    node.data.toolTipActive = !node.data.toolTipActive;
  };

  onAddPerson(): void {
    const personRequest: CreatePersonRequest = { ...this.addPersonForm.value };
    personRequest.gender = Gender.getById(this.addPersonForm.value.gender);
    const person = this.familyTreeService.addPerson(personRequest, this.familyTree.id);
    this.addPersonForm.reset();
    this.graphManager.createNewNode(person);
  }

  onOpenContextMenu(person: Person): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent, { size: 'lg' });
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.familyTree = this.familyTree;
    modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => this.deletePersonEvent(personToDelete, modalRef));
    modalRef.componentInstance.updatePerson.subscribe(this.updatePersonEvent);
  }

  updatePersonEvent = (personToUpdate: Person) => {
    this.graphManager.updateNode(personToUpdate);
    if (personToUpdate.children) {
      this.graphManager.updateEdges(personToUpdate);
    }
    this.familyTreeService.updatePerson(personToUpdate, this.familyTree.id);
  };

  deletePersonEvent = (personToDelete: Person, modalRef: NgbModalRef) => {
    this.familyTreeService.deletePerson(personToDelete, this.familyTree.id);
    this.graphManager.removeNode(personToDelete);
    modalRef.close();
  };
}
