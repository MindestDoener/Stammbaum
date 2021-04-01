import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person, convertDate} from '../../shared/types';

@Component({
  selector: 'app-person-display',
  templateUrl: './person-display.component.html',
  styleUrls: ['./person-display.component.scss']
})
export class PersonDisplayComponent implements OnInit {

  @Input()
  person!: Person;

  @Output()
  openContextMenu: EventEmitter<Person> = new EventEmitter();

  convertDate(date: Date): string {
    return convertDate(date);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  onOpenContextMenu(): void {
    this.openContextMenu.emit(this.person);
  }
}
