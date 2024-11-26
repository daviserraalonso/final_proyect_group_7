import { TestBed } from '@angular/core/testing';

import { DashboardStudentService } from './dashboard-student.service';

describe('DashboardStudentService', () => {
  let service: DashboardStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
