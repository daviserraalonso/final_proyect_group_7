import { TestBed } from '@angular/core/testing';

import { QualificationServiceService } from './qualification-service.service';

describe('QualificationServiceService', () => {
  let service: QualificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
