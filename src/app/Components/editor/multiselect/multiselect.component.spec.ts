import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectComponent } from './multiselect.component';

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MultiselectComponent],
    });

    fixture = TestBed.createComponent(MultiselectComponent);

    component = fixture.componentInstance;

    component.collapseThreshold = 5;
    component.initialValue = [1, 2];
    component.label = 'label';
    component.placeholder = 'placeholder';
    component.options = [
      { label: 'one', id: 1 },
      { label: 'two', id: 2 },
      { label: 'three', id: 3 },
      { label: 'four', id: 4 },
    ];
    component.emptyText = 'empty text';
    component.disabledText = 'disabled';

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
