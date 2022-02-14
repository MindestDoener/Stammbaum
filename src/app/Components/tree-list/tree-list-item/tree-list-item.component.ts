import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyTree } from '../../../shared/types/familyTree';
import { DateConverter } from '../../../shared/types/dateConverter';
import { getToday } from '../../../shared/types/time';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tree-list-item',
  templateUrl: './tree-list-item.component.html',
  styleUrls: ['./tree-list-item.component.scss'],
})
export class TreeListItemComponent implements OnInit{

  @Input()
  familyTree!: FamilyTree;

  @Input()
  mode: 'edit' | 'view' | 'add' | undefined;

  @Output()
  delete: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  update: EventEmitter<string> = new EventEmitter<string>();

  dateConverter: DateConverter = new DateConverter();

  updateNameForm = new FormGroup({
    treeName: new FormControl(),
  });

  getLastChanged = () => {
    const lastChanged = this.familyTree.lastChanged;
    if (lastChanged.date.equals(getToday())) {
      return 'Today ' + lastChanged.time.toString() ;
    }
    return this.dateConverter.format(lastChanged.date) + ' ' + lastChanged.time.toString();
  };

  updateName(): void {
    this.update.emit(this.updateNameForm.value.treeName);
  }

  ngOnInit(): void {
    this.updateNameForm.setValue({treeName: this.familyTree.name});
  }
}
