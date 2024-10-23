import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowWorkComponentComponent } from './how-work-component.component';

describe('HowWorkComponentComponent', () => {
  let component: HowWorkComponentComponent;
  let fixture: ComponentFixture<HowWorkComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowWorkComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowWorkComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
