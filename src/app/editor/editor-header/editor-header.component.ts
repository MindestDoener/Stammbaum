import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor-header',
  templateUrl: './editor-header.component.html',
  styleUrls: ['./editor-header.component.scss']
})
export class EditorHeaderComponent implements OnInit {

  @Input()
  treeName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
