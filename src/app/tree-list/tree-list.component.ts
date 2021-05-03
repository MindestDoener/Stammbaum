import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StammbaumServiceService } from '../shared/stammbaum-service.service';
import { Stammbaum } from '../shared/types';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {

  treeList: Stammbaum[] = [];

  createStammbaumForm = new FormGroup({
    treeName: new FormControl()
  });

  constructor(private stammbaumService: StammbaumServiceService) { }

  ngOnInit(): void {
    this.treeList = this.stammbaumService.stammbaumList;
  }

  onCreateStammbaum(): void {
    this.stammbaumService.createEmptyStammbaum(this.createStammbaumForm.controls.treeName.value);
    // this.initDiagram();
  }

}
