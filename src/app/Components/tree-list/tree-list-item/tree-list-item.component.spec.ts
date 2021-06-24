import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeListItemComponent } from './tree-list-item.component';
import { TestData } from '../../../shared/types/test/testData';

describe('TreeListItemComponent', () => {
  let component: TreeListItemComponent;
  let fixture: ComponentFixture<TreeListItemComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TreeListItemComponent],
    });

    fixture = TestBed.createComponent(TreeListItemComponent);

    component = fixture.componentInstance;

    component.familyTree = TestData.testTree;
    component.mode = "view";

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
