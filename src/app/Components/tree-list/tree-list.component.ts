import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StammbaumServiceService } from '../../shared/stammbaum-service.service';
import { Stammbaum } from '../../shared/types';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css'],
})
export class TreeListComponent {
  treeList?: Map<string, Stammbaum> = this.stammbaumService.getTreeList();

  createStammbaumForm = new FormGroup({
    treeName: new FormControl(),
  });

  mode: 'edit' | 'view' | 'add' = 'view';

  constructor(
    private stammbaumService: StammbaumServiceService,
    private router: Router,
  ) {
  }

  onCreateStammbaum(): void {
    const sbID =
      this.stammbaumService.stammbaumList === undefined
        ? '0'
        : this.stammbaumService.stammbaumList.size.toString();
    this.stammbaumService.createEmptyStammbaum(
      this.createStammbaumForm.controls.treeName.value,
      sbID,
    );
    this.setMode('view');
    this.router.navigate(['trees/' + sbID]);
    this.treeList = this.stammbaumService.getTreeList();
  }

  setMode(mode: 'edit' | 'view' | 'add'): void {
    console.log(mode);
    this.mode = mode;
  }
}
