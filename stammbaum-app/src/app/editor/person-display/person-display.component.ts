import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from '../../shared/types';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  onOpenContextMenu(): void {
    this.openContextMenu.emit(this.person);
  }

  convertDate(date: Date): string {
    const temp = date.toString().split('-');
    return `${temp[2]}.${temp[1]}.${temp[0]}`;
  }
}
