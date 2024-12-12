import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksResponseComponent } from './tasks-response.component';

describe('TasksResponseComponent', () => {
  let component: TasksResponseComponent;
  let fixture: ComponentFixture<TasksResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
