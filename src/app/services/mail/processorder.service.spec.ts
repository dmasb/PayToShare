import { TestBed } from '@angular/core/testing';

import { ProcessorderService } from './processorder.service';

describe('ProcessorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessorderService = TestBed.get(ProcessorderService);
    expect(service).toBeTruthy();
  });
});
