import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class MultiselectComponent implements AfterContentInit {

  @Input()
  collapseThreshold!: number;

  @Input()
  initialValue!: number[];

  @Input()
  label!: string;

  @Input()
  placeholder!: string;

  @Input()
  options!: { label: string, id: number }[];

  optionsFiltered: { label: string, id: number }[] | undefined;

  @Input()
  emptyText!: string;

  @Input()
  disabled = false;

  @Input()
  disabledText!: string;

  @Output()
  valueChange: EventEmitter<number[]> = new EventEmitter();

  selectedValues: number[] = [];

  text?: string;

  searchInput: FormControl = new FormControl();

  constructor() {
  }

  ngAfterContentInit(): void {
    this.selectedValues = this.initialValue;
    this.changeText();
  }

  toggle = (event: any, id: number) => {
    if (event.currentTarget.checked) {
      this.selectedValues.push(id);
    } else {
      this.selectedValues.splice(this.selectedValues.indexOf(id), 1);
    }
    this.valueChange.emit(this.selectedValues);
    this.changeText();
  };

  reset(): void {
    this.selectedValues = [];
    this.changeText();
    this.optionsFiltered = undefined;
    this.searchInput.reset();
    this.valueChange.emit(this.selectedValues);
  }

  changeText = () => {
    if (this.selectedValues.length < this.collapseThreshold) {
      let text = '';
      for (const value of this.selectedValues) {
        const option = this.options.find(it => it.id === value);
        if (option) {
          text += option.label + ', ';
        }
      }
      this.text = text.slice(0, text.length - 2);
    } else {
      this.text = `${this.selectedValues.length} Ausgewählt`;
    }
  };

  filterOptions(): void {
    if (this.searchInput.value === '') {
      this.optionsFiltered = undefined;
      return;
    }

    this.optionsFiltered = this.options.filter(option => option.label.toLowerCase().includes(this.searchInput.value.toLowerCase()));
  }
}
