import { TestBed, inject } from '@angular/core/testing';

import { ConstructionAreaService } from './construction-area.service';

describe('ConstructionAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstructionAreaService]
    });
  });

  it('should be created', inject([ConstructionAreaService], (service: ConstructionAreaService) => {
    expect(service).toBeTruthy();
  }));
});
