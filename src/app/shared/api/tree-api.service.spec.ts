import { TestBed } from '@angular/core/testing';

import { TreeApiService } from './tree-api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('TreeApiService', () => {
  let service: TreeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: HttpClientTestingModule },
        { provide: Router, useValue: RouterTestingModule },
      ]
    });
    service = TestBed.inject(TreeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
