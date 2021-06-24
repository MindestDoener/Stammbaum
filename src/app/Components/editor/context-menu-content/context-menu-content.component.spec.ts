import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuContentComponent } from './context-menu-content.component';
import { TestData } from '../../../shared/types/test/testData';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ContextMenuContentComponent', () => {
  let component: ContextMenuContentComponent;
  let fixture: ComponentFixture<ContextMenuContentComponent>;

  class ModalServiceMock {
    public close = () => {};
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ContextMenuContentComponent],
      providers: [{provide: NgbActiveModal, useValue: ModalServiceMock}]
    });

    fixture = TestBed.createComponent(ContextMenuContentComponent);

    component = fixture.componentInstance;

    component.person = TestData.testFather;
    component.mode = 'UPDATE';
    component.familyTree = TestData.testTree;

  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
