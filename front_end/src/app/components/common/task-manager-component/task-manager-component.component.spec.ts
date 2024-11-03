import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerComponentComponent } from './task-manager-component.component';

describe('TaskManagerComponentComponent', () => {
  let component: TaskManagerComponentComponent;
  let fixture: ComponentFixture<TaskManagerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
