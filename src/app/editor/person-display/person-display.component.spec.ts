import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDisplayComponent } from './person-display.component';

describe('PersonDisplayComponent', () => {
  let component: PersonDisplayComponent;
  let fixture: ComponentFixture<PersonDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
