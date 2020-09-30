import { TestBed } from '@angular/core/testing';

import { StatisticsGuard } from './statistics.guard';

// Plik z testami jednostkowymi automatycznie generowany przez Angular CLI
// Każdy komponent i plik o rozszerzeniu .ts posiada odpowiadający mu plik z testami jednostkowymi
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
