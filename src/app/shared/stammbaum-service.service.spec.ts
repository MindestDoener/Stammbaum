import { TestBed } from '@angular/core/testing';

import { StammbaumServiceService } from './stammbaum-service.service';

describe('StammbaumServiceService', () => {
  let service: StammbaumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StammbaumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
