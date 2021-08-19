import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestData } from '../../shared/types/test/testData';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  const ne = new NavigationEnd(0, 'http://localhost:4200/trees/0', 'http://localhost:4200/trees/0');

  const mockRouter = {
    events: new Observable(observer => {
      observer.next(ne);
      observer.complete();
    }),
    navigate: () => {},
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: HttpClient, useValue: HttpClientTestingModule },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '0' }, data: {tree: TestData.testTree} },
          },
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
