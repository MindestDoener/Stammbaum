import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMenuComponent } from './export-menu.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ExportMenuComponent', () => {
  let component: ExportMenuComponent;
  let fixture: ComponentFixture<ExportMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportMenuComponent ],
      providers: [
        { provide: NgbActiveModal, useValue: NgbActiveModal },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
