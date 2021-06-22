import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyTreeService } from '../../shared/family-tree.service';
import { FamilyTree } from '../../shared/types';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss'],
})
export class TreeListComponent {
  treeList?: Map<string, FamilyTree> = this.familyTreeService.getTreeList();

  createFamilyTreeForm = new FormGroup({
    treeName: new FormControl(),
  });

  mode: 'edit' | 'view' | 'add' = 'view';

  constructor(
    private familyTreeService: FamilyTreeService,
    private router: Router,
  ) {
  }

  onCreateFamilyTree(): void {
    const TreeId =
      this.familyTreeService.familyTreeList === undefined
        ? '0'
        : this.familyTreeService.familyTreeList.size.toString();
    this.familyTreeService.createEmptyFamilyTree(
      this.createFamilyTreeForm.controls.treeName.value,
      TreeId,
    );
    this.setMode('view');
    this.router.navigate(['trees/' + TreeId]);
    this.treeList = this.familyTreeService.getTreeList();
  }

  setMode(mode: 'edit' | 'view' | 'add'): void {
    console.log(mode);
    this.mode = mode;
  }

  deleteTree(id: string): void {
    this.familyTreeService.deleteFamilyTree(id);
  }

  openTree(id: string): void {
    if (this.mode === 'view') {
      this.router.navigate(['/trees/' + id])
    }
  }
}
