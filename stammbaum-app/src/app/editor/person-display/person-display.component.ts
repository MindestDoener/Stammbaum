import {Component, Input, OnInit} from '@angular/core';
import {Person} from '../../shared/types';

@Component({
  selector: 'app-person-display',
  templateUrl: './person-display.component.html',
  styleUrls: ['./person-display.component.less']
})
export class PersonDisplayComponent implements OnInit {

  @Input()
  person!: Person;

  constructor() { }

  ngOnInit(): void {
  }

}
