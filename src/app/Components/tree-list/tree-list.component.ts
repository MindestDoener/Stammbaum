import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    treeList$: Observable<FamilyTree[]> =
        this.familyTreeService.getTreeListSorted(this.sortMode);

    page = 1;
    pageSize = 5;

    createFamilyTreeForm = new FormGroup({
        treeName: new FormControl(),
    });

    mode: 'edit' | 'view' | 'add' = 'view';

    constructor(
        private familyTreeService: FamilyTreeService,
        private router: Router
    ) {}

    onCreateFamilyTree(): void {
        this.familyTreeService
            .createEmptyFamilyTree(
                this.createFamilyTreeForm.controls.treeName.value
            )
            .subscribe((response) => {
                this.setMode('view');
                this.router.navigate(['trees/' + response.id]);
                this.treeList$ = this.familyTreeService.getTreeListSorted(
                    this.sortMode
                );
            });
    }

    setMode(mode: 'edit' | 'view' | 'add'): void {
        this.mode = mode;
        if (mode === 'add') {
            this.pageSize = 4;
        } else {
            this.pageSize = 5;
        }
    }

    setSortMode(sortMode: number): void {
        this.sortMode = sortMode;
        this.treeList$ = this.familyTreeService.getTreeListSorted(
            this.sortMode
        );
    }

    deleteTree(id: string): void {
        this.familyTreeService.deleteFamilyTree(id).subscribe(
            () => {},
            () => {
                this.treeList$ = this.familyTreeService.getTreeListSorted(
                    this.sortMode
                );
            },
            () => {}
        );
    }

    openTree(id: string): void {
        if (this.mode === 'view') {
            this.router.navigate(['/trees/' + id]);
        }
    }
}
