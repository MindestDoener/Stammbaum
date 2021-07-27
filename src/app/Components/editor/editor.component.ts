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
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {

  familyTree$!: Observable<FamilyTree>;
  graphManager: GraphManager = new GraphManager();
  genders = ['Männlich', 'Weiblich', 'Divers'];

  constructor(private familyTreeService: FamilyTreeService, private modalService: NgbModal,
              private route: ActivatedRoute, private router: Router) {

    router.events.subscribe(() => {
      const params = this.route.snapshot.paramMap;
      try {
        this.graphManager.clear();
        this.familyTree$ = this.familyTreeService.getSingleTree(params.get('id'));
        this.familyTree$.pipe(tap(tree => this.graphManager.init(tree)))
      } catch (e) {
        router.navigate(['/home']); // redirect home when invalid tree id
      }
    });

  }

  dblClickEvent = (node: Node) => {
    this.familyTree$.pipe(tap(tree => {
      const person = this.familyTreeService.getPersonById(+node.id, tree.id);
      if (person) {
        this.openUpdateMenu(person);
      }
    }))
  };

  toggleTooltip = (node: Node) => {
    node.data.toolTipActive = !node.data.toolTipActive;
  };

  openCreateMenu(): void {
    this.familyTree$.pipe(tap(tree => {
      const modalRef = this.modalService.open(ContextMenuContentComponent, { size: 'lg' });
      modalRef.componentInstance.familyTree = tree;
      modalRef.componentInstance.mode = 'ADD';
      modalRef.componentInstance.addPerson.subscribe(this.addPersonEvent);
    }))

  }

  openUpdateMenu(person: Person): void {
    this.familyTree$.pipe(tap(tree => {
      const modalRef = this.modalService.open(ContextMenuContentComponent, { size: 'lg' });
      modalRef.componentInstance.person = person;
      modalRef.componentInstance.familyTree = tree;
      modalRef.componentInstance.mode = 'UPDATE';
      modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => this.deletePersonEvent(personToDelete, modalRef));
      modalRef.componentInstance.updatePerson.subscribe(this.updatePersonEvent);
    }))

  }

  updatePersonEvent = (personToUpdate: Person) => {
    this.familyTree$.pipe(tap(tree => {
      this.graphManager.updateNode(personToUpdate);
      if (personToUpdate.children) {
        this.graphManager.updateEdges(personToUpdate);
      }
      this.familyTreeService.updatePerson(personToUpdate, tree.id);
    }))
  };

  deletePersonEvent = (personToDelete: Person, modalRef: NgbModalRef) => {
    this.familyTree$.pipe(tap(tree => {
      this.familyTreeService.deletePerson(personToDelete, tree.id);
      this.graphManager.removeNode(personToDelete);
      modalRef.close();
    }))
  };

  addPersonEvent = (newPerson: CreatePersonRequest) => {
    this.familyTree$.pipe(tap(tree => {
      const person = this.familyTreeService.addPerson(newPerson, tree.id);
      this.graphManager.createNewNode(person);
      if (person.children) {
        this.graphManager.updateEdges(person);
      }
    }))
  };
}
