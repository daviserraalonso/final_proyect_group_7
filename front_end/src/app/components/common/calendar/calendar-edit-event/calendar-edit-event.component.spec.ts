import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEditEventComponent } from './calendar-edit-event.component';

describe('CalendarEditEventComponent', () => {
  let component: CalendarEditEventComponent;
  let fixture: ComponentFixture<CalendarEditEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEditEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
