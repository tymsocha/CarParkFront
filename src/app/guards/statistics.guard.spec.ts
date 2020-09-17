import { TestBed } from '@angular/core/testing';

import { StatisticsGuard } from './statistics.guard';

describe('StatisticsGuard', () => {
  let guard: StatisticsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StatisticsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
