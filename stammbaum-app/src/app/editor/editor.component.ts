import {Component, OnInit} from '@angular/core';
import {StammbaumServiceService} from '../shared/stammbaum-service.service';
import {CreatePersonRequest, Stammbaum} from '../shared/types';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  stammbaum?: Stammbaum;

  constructor(private stammbaumService: StammbaumServiceService) {
  }

  ngOnInit(): void {
  }

  onCreateStammbaum(name: string): void {
    this.stammbaum = this.stammbaumService.createEmptyStammbaum(name);
  }

  onAddPerson(personRequest: CreatePersonRequest): void {
    this.stammbaumService.addPersonToStammbaum(personRequest);
  }

}
