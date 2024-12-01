import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentialCoursesInscriptionComponent } from './presential-courses-inscription.component';

describe('PresentialCoursesInscriptionComponent', () => {
  let component: PresentialCoursesInscriptionComponent;
  let fixture: ComponentFixture<PresentialCoursesInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentialCoursesInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentialCoursesInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
