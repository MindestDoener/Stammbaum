import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeListComponent } from './tree-list.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TreeListComponent', () => {
  let component: TreeListComponent;
  let fixture: ComponentFixture<TreeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreeListComponent],
      providers: [
        { provide: Router, useValue: RouterTestingModule },
        { provide: HttpClient, useValue: HttpClientTestingModule },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => { // fixme!!!
    expect(component).toBeTruthy();
  });
});
