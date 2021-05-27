import { Component } from '@angular/core';
import { FamilyTreeService } from './shared/family-tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stammbaum-app';
  treeList;

  constructor(familyTreeService: FamilyTreeService) {
    this.treeList = familyTreeService.getTreeList();
  }
}
