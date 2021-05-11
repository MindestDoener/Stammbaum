import {Component, OnInit} from '@angular/core';
import {StammbaumServiceService} from '../../shared/stammbaum-service.service';
import {convertDate, CreatePersonRequest, Gender, Person, Stammbaum} from '../../shared/types';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContextMenuContentComponent} from './context-menu-content/context-menu-content.component';
import { ActivatedRoute } from '@angular/router';
import {Edge, Node} from '@swimlane/ngx-graph';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit{

  constructor(private stammbaumService: StammbaumServiceService, private modalService: NgbModal, private route: ActivatedRoute) {
  }

  addPersonForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    deathDate: new FormControl()
  });

  stammbaum!: Stammbaum;

  nodes: Node[] = [];
  links: Edge[] = [];

  genders = ['Male', 'Female', 'Diverse'];

  private static getValue(person: Person): string {
    if (person.deathDate) {
      return person.firstName + ' ' + person.lastName +
        '\n * ' + convertDate(person.birthDate) + ' - † ' + convertDate(person.deathDate);
    }
    return person.firstName + ' ' + person.lastName + '\n * ' + convertDate(person.birthDate);
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    this.stammbaum = this.stammbaumService.getSingleTree(params.get('id'));
  }

  dblClickEvent = (node: Node) => {
    const person = this.stammbaumService.getPersonById(+node.id, this.stammbaum.id);
    if (person) {
      this.onOpenContextMenu(person);
    }
  }

  onAddPerson(): void {
    const personRequest: CreatePersonRequest = {...this.addPersonForm.value};
    personRequest.gender = Gender.getById(this.addPersonForm.value.gender);
    const person = this.stammbaumService.addPerson(personRequest, this.stammbaum.id);
    this.addPersonForm.reset();
    const node: Node = {
      id: person.id.toString(),
      label: EditorComponent.getValue(person),
      dimension: {width: 200, height: 40},
      data: {customColor: person.gender.color},
    };
    person.node = node;
    this.nodes.push(node);
    this.nodes = [...this.nodes];
  }

  onOpenContextMenu(person: Person): void {
    const modalRef = this.modalService.open(ContextMenuContentComponent, {size: 'lg'});
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.deletePerson.subscribe((personToDelete: Person) => {
      this.stammbaumService.deletePerson(personToDelete, this.stammbaum.id);
      modalRef.close();
    });
    modalRef.componentInstance.updatePerson.subscribe(this.updatePersonEvent);
  }

  updatePersonEvent = (personToUpdate: Person) => {
    this.stammbaumService.updatePerson(personToUpdate, this.stammbaum.id);
  }
}
