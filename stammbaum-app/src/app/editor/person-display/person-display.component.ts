import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../shared/types';

@Component({
  selector: 'app-person-display',
  templateUrl: './person-display.component.html',
  styleUrls: ['./person-display.component.less']
})
export class PersonDisplayComponent implements OnInit {

  @Input()
  person!: Person;

  @Output()
  deletePerson: EventEmitter<Person> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDeletePerson(): void {
    this.deletePerson.emit(this.person);
  }

}
