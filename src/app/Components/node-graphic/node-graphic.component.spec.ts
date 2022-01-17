import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGraphicComponent } from './node-graphic.component';

describe('NodeGraphicComponent', () => {
  let component: NodeGraphicComponent;
  let fixture: ComponentFixture<NodeGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
