import { TestBed, inject } from '@angular/core/testing';

import { ConstructionLadderService } from './construction-ladder.service';

describe('ConstructionLadderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstructionLadderService]
    });
  });

  it('should be created', inject([ConstructionLadderService], (service: ConstructionLadderService) => {
    expect(service).toBeTruthy();
  }));
});
