import { TestBed } from '@angular/core/testing';

import { SomethingGuard } from './something.guard';

describe('SomethingGuard', () => {
  let guard: SomethingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SomethingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
