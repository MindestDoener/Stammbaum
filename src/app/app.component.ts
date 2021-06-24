import { Component } from '@angular/core';
import { FamilyTreeService } from './shared/family-tree.service';
import { SortMode } from './shared/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stammbaum-app';

  constructor(private familyTreeService: FamilyTreeService) {
  }

  getTreeList = () => {
    return this.familyTreeService.getTreeListSorted(SortMode.lastChanged).slice(0,5);
  }
}
