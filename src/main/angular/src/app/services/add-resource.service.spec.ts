import { TestBed, inject } from '@angular/core/testing';

import { AddResourceService } from './add-resource.service';

describe('AddResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddResourceService]
    });
  });

  it('should be created', inject([AddResourceService], (service: AddResourceService) => {
    expect(service).toBeTruthy();
  }));
});
