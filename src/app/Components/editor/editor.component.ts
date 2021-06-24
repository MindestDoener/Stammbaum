import { Component } from '@angular/core';
import { FamilyTreeService } from '../../shared/family-tree.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuContentComponent } from './context-menu-content/context-menu-content.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Node } from '@swimlane/ngx-graph';
import { GraphManager } from './Graph/GraphManager';
import { FamilyTree } from '../../shared/types/familyTree';
import { Person } from '../../shared/types/person';
import { CreatePersonRequest } from '../../shared/types/createPersonRequest';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {

  familyTree!: FamilyTree;
  graphManager: GraphManager = new GraphManager();
  genders = ['Männlich', 'Weiblich', 'Divers'];

  constructor(private familyTreeService: FamilyTreeService, private modalService: NgbModal,
              private route: ActivatedRoute, private router: Router) {

    router.events.subscribe(() => {
      const params = this.route.snapshot.paramMap;
      try {
        this.graphManager.clear();
        this.familyTree = this.familyTreeService.getSingleTree(params.get('id'));
        this.graphManager.init(this.familyTree);
      } catch (e) {
        router.navigate(['/home']); // redirect home when invalid tree id
      }
    });

  }

  dblClickEvent = (node: Node) => {
    const person = this.familyTreeService.getPersonById(+node.id, this.familyTree.id);
    if (person) {
      this.openUpdateMenu(person);
    }
  };

  toggleTooltip = (node: Node) => {
    node.data.toolTipActive = !node.data.toolTipActive;
  };

  openCreateMenu(): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent, { size: 'lg' });
    modalRef.componentInstance.familyTree = this.familyTree;
    modalRef.componentInstance.mode = 'ADD';
    modalRef.componentInstance.addPerson.subscribe(this.addPersonEvent);
  }

  openUpdateMenu(person: Person): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent, { size: 'lg' });
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.familyTree = this.familyTree;
    modalRef.componentInstance.mode = 'UPDATE';
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

  addPersonEvent = (newPerson: CreatePersonRequest) => {
    const person = this.familyTreeService.addPerson(newPerson, this.familyTree.id);
    this.graphManager.createNewNode(person);
    if (person.children) {
      this.graphManager.updateEdges(person);
    }
  };
}
