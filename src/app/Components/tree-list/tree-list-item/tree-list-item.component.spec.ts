import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeListItemComponent } from './tree-list-item.component';

describe('TreeListItemComponent', () => {
  let component: TreeListItemComponent;
  let fixture: ComponentFixture<TreeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeListItemComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
