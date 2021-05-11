import {Component} from '@angular/core';
import {StammbaumServiceService} from '../../shared/stammbaum-service.service';
import {CreatePersonRequest, Gender, Person, Stammbaum} from '../../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuContentComponent} from './context-menu-content/context-menu-content.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Node} from '@swimlane/ngx-graph';
import {GraphManager} from './GraphManager';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  constructor(private stammbaumService: StammbaumServiceService, private modalService: NgbModal,
              private route: ActivatedRoute, private router: Router) {
    const params = this.route.snapshot.paramMap;
    try {
      this.stammbaum = this.stammbaumService.getSingleTree(params.get('id'));
    } catch (e) {
      router.navigate(['/home']); // redirect home when invalid tree id
    }
  }

  addPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl()
  });

  stammbaum!: Stammbaum;

  graphManager: GraphManager = new GraphManager();

  genders = ['Male', 'Female', 'Diverse'];

  dblClickEvent = (node: Node) => {
    const person = this.stammbaumService.getPersonById(+node.id, this.stammbaum.id);
    if (person) {
      this.onOpenContextMenu(person);
    }
  }

  toggleTooltip = (node: Node) => {
    node.data.toolTipActive = !node.data.toolTipActive;
  }

  onAddPerson(): void {
    const personRequest: CreatePersonRequest = {...this.addPersonForm.value};
    personRequest.gender = Gender.getById(this.addPersonForm.value.gender);
    const person = this.stammbaumService.addPerson(personRequest, this.stammbaum.id);
    this.addPersonForm.reset();
    this.graphManager.createNewNode(person);
  }

  onOpenContextMenu(person: Person): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent, {size: 'lg'});
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.stammbaum = this.stammbaum;
    modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => this.deletePersonEvent(personToDelete, modalRef));
    modalRef.componentInstance.updatePerson.subscribe(this.updatePersonEvent);
  }

  updatePersonEvent = (personToUpdate: Person) => {
    this.graphManager.updateNode(personToUpdate);
    if (personToUpdate.children) {
      this.graphManager.updateEdges(personToUpdate);
    }
    this.stammbaumService.updatePerson(personToUpdate, this.stammbaum.id);
  }

  deletePersonEvent = (personToDelete: Person, modalRef: NgbModalRef) => {
    this.stammbaumService.deletePerson(personToDelete, this.stammbaum.id);
    this.graphManager.removeNode(personToDelete);
    modalRef.close();
  }
}
