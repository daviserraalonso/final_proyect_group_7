import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileComponentComponent } from './admin-profile-component.component';

describe('AdminProfileComponentComponent', () => {
  let component: AdminProfileComponentComponent;
  let fixture: ComponentFixture<AdminProfileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProfileComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});