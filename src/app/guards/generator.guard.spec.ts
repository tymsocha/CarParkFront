import { TestBed } from '@angular/core/testing';

import { GeneratorGuard } from './generator.guard';

// Plik z testami jednostkowymi automatycznie generowany przez Angular CLI
// Każdy komponent i plik o rozszerzeniu .ts posiada odpowiadający mu plik z testami jednostkowymi
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
