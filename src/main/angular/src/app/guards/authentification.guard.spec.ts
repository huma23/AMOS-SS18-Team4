import { TestBed, async, inject } from '@angular/core/testing';

import { AuthentificationGuard } from './authentification.guard';

describe('AuthentificationGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthentificationGuard]
    });
  });

  it('should ...', inject([AuthentificationGuard], (guard: AuthentificationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
