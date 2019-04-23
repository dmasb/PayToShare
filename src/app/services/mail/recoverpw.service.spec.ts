import { TestBed } from '@angular/core/testing';

import { RecoverpwService } from './recoverpw.service';

describe('RecoverpwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoverpwService = TestBed.get(RecoverpwService);
    expect(service).toBeTruthy();
  });
});
