import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageDialogComponent } from './new-message-dialog.component';

describe('NewMessageDialogComponent', () => {
  let component: NewMessageDialogComponent;
  let fixture: ComponentFixture<NewMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMessageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
