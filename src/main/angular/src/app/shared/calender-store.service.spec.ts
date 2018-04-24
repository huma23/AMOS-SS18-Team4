import { TestBed, inject } from '@angular/core/testing';

import { CalenderStoreService } from './calender-store.service';

describe('CalenderStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalenderStoreService]
    });
  });

  it('should be created', inject([CalenderStoreService], (service: CalenderStoreService) => {
    expect(service).toBeTruthy();
  }));
});
