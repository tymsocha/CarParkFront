import { TestBed } from '@angular/core/testing';

import { GeneratorGuard } from './generator.guard';

describe('GeneratorGuard', () => {
  let guard: GeneratorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GeneratorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
