import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WakeUpCallComponent } from './wake-up-call.component';

describe('WakeUpCallComponent', () => {
  let component: WakeUpCallComponent;
  let fixture: ComponentFixture<WakeUpCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WakeUpCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WakeUpCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
