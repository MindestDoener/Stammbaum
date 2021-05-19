import { Component, Input } from '@angular/core';
import { Stammbaum } from '../../../shared/types';

@Component({
  selector: 'app-tree-list-item',
  templateUrl: './tree-list-item.component.html',
  styleUrls: ['./tree-list-item.component.css'],
})
export class TreeListItemComponent {

  @Input()
  stammbaum!: Stammbaum;

}
