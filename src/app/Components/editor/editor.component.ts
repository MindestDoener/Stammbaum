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
import { Observable } from 'rxjs';
import { ExportMenuComponent } from './export-menu/export-menu.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {

  familyTree$?: Observable<FamilyTree>;
  familyTree?: FamilyTree;
  familyTreeName$?: Observable<string>;
  graphManager: GraphManager = new GraphManager();
  genders = ['Männlich', 'Weiblich', 'Divers'];

  constructor(private familyTreeService: FamilyTreeService, private modalService: NgbModal,
    private route: ActivatedRoute, private router: Router,) {
    this.familyTree = route.snapshot.data.tree as FamilyTree;
    if (this.familyTree) {
      this.graphManager.init(this.familyTree);
    }
  }


  dblClickEvent = (node: Node) => {
    if (this.familyTree) {
        const person = this.familyTreeService.getPersonById(this.familyTree, +node.id);
        if (person) {
          this.openUpdateMenu(person);
        }
    }
  };

  toggleTooltip = (node: Node) => {
    node.data.toolTipActive = !node.data.toolTipActive;
  };

  openCreateMenu(): void {
    if (this.familyTree) {
        const modalRef = this.modalService.open(ContextMenuContentComponent, { size: 'lg' });
        modalRef.componentInstance.familyTree = this.familyTree;
        modalRef.componentInstance.mode = 'ADD';
        modalRef.componentInstance.addPerson.subscribe(this.addPersonEvent);
    }
  }

  openUpdateMenu(person: Person): void {
    if (this.familyTree) {

        const modalRef = this.modalService.open(ContextMenuContentComponent, { size: 'lg' });
        modalRef.componentInstance.person = person;
        modalRef.componentInstance.familyTree = this.familyTree;
        modalRef.componentInstance.mode = 'UPDATE';
        modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => this.deletePersonEvent(personToDelete, modalRef));
        modalRef.componentInstance.updatePerson.subscribe(this.updatePersonEvent);

    }
  }

  updatePersonEvent = (personToUpdate: Person) => {
    if (this.familyTree) {
        this.graphManager.updateNode(personToUpdate);
        if (personToUpdate.children) {
          this.graphManager.updateEdges(personToUpdate);
        }
        this.familyTreeService.updatePerson(this.familyTree, personToUpdate);
    }
  };

  deletePersonEvent = (personToDelete: Person, modalRef: NgbModalRef) => {
    if (this.familyTree) {
        this.familyTreeService.deletePerson(this.familyTree, personToDelete);
        this.graphManager.removeNode(personToDelete);
        modalRef.close();
    }
  };

  addPersonEvent = (newPerson: CreatePersonRequest) => {
    if (this.familyTree) {
        const person = this.familyTreeService.addPerson(this.familyTree, newPerson);
        this.graphManager.createNewNode(person);
        if (person.children) {
          this.graphManager.updateEdges(person);
        }
    }
  }

  openExportMenu(): void {
    this.modalService.open(ExportMenuComponent);
  }
}
