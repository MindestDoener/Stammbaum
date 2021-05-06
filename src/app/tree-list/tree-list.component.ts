import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StammbaumServiceService } from '../shared/stammbaum-service.service';
import { Person, Stammbaum } from '../shared/types';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent {

  treeList?: Map<string, Stammbaum> = this.stammbaumService.getTreeList();

  createStammbaumForm = new FormGroup({
    treeName: new FormControl()
  });

  constructor(private stammbaumService: StammbaumServiceService) { }

  onCreateStammbaum(): void {
    const sbID = (this.stammbaumService.stammbaumList === undefined) ? "0" : this.stammbaumService.stammbaumList.size.toString();
    this.stammbaumService.createEmptyStammbaum(this.createStammbaumForm.controls.treeName.value, sbID);
    this.treeList = this.stammbaumService.getTreeList();
    // this.initDiagram();
  }


}
