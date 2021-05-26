import { Component, Input } from '@angular/core';
import { FamilyTree } from '../../../shared/types';

@Component({
  selector: 'app-tree-list-item',
  templateUrl: './tree-list-item.component.html',
  styleUrls: ['./tree-list-item.component.scss'],
})
export class TreeListItemComponent {

  @Input()
  familyTree!: FamilyTree;

}
