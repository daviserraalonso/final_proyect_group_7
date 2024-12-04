import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicOfferingComponent } from './academic-offering.component';

describe('AcademicOfferingComponent', () => {
  let component: AcademicOfferingComponent;
  let fixture: ComponentFixture<AcademicOfferingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicOfferingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicOfferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
