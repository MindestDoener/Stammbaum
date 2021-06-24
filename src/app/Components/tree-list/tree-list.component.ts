import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyTreeService } from '../../shared/family-tree.service';
import { FamilyTree } from '../../shared/types/familyTree';
import { SortMode } from '../../shared/types/sortMode';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss'],
})
export class TreeListComponent {

  sortMode: SortMode = SortMode.lastChanged;
  treeList?: FamilyTree[] = this.familyTreeService.getTreeListSorted(this.sortMode);

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
      this.familyTreeService.familyTreeMap === undefined
        ? '0'
        : this.familyTreeService.familyTreeMap.size.toString();
    this.familyTreeService.createEmptyFamilyTree(
      this.createFamilyTreeForm.controls.treeName.value,
      TreeId,
    );
    this.setMode('view');
    this.router.navigate(['trees/' + TreeId]);
    this.treeList = this.familyTreeService.getTreeListSorted(this.sortMode);
  }

  setMode(mode: 'edit' | 'view' | 'add'): void {
    this.mode = mode;
  }

  setSortMode(sortMode: number): void {
    this.sortMode = sortMode;
    this.treeList = this.familyTreeService.getTreeListSorted(this.sortMode);
  }

  deleteTree(id: string): void {
    this.familyTreeService.deleteFamilyTree(id);
  }

  openTree(id: string): void {
    if (this.mode === 'view') {
      this.router.navigate(['/trees/' + id]);
    }
  }
}
