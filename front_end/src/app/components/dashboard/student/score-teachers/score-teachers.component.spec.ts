import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTeachersComponent } from './score-teachers.component';

describe('ScoreTeachersComponent', () => {
  let component: ScoreTeachersComponent;
  let fixture: ComponentFixture<ScoreTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreTeachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
