import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubjectsComponent } from './subject-list.component';

describe('AllSubjectsComponent', () => {
  let component: AllSubjectsComponent;
  let fixture: ComponentFixture<AllSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSubjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
