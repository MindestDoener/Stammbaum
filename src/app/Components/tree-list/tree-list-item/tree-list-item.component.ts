import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FamilyTree } from '../../../shared/types/familyTree';
import { DateConverter } from '../../../shared/types/dateConverter';
import { getToday } from '../../../shared/types/time';

@Component({
  selector: 'app-tree-list-item',
  templateUrl: './tree-list-item.component.html',
  styleUrls: ['./tree-list-item.component.scss'],
})
export class TreeListItemComponent {

  @Input()
  familyTree!: FamilyTree;

  @Input()
  mode: 'edit' | 'view' | 'add' | undefined;

  @Output()
  delete: EventEmitter<string> = new EventEmitter<string>();

  dateConverter: DateConverter = new DateConverter();

  getLastChanged = () => {
    const lastChanged = this.familyTree.lastChanged;
    if (lastChanged.date.equals(getToday())) {
      return 'Heute ' + lastChanged.time.toString() ;
    }
    return this.dateConverter.format(lastChanged.date) + ' ' + lastChanged.time.toString();
  };

}
