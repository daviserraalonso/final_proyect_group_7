import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineInscriptionComponentComponent } from './online-inscription.component.component';

describe('OnlineInscriptionComponentComponent', () => {
  let component: OnlineInscriptionComponentComponent;
  let fixture: ComponentFixture<OnlineInscriptionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineInscriptionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineInscriptionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
