import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule]
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: number, subjectId: number }
  ) {
    this.taskForm = this.fb.group({
      studentId: [data.studentId, Validators.required],
      subjectId: [data.subjectId, Validators.required],
      comments: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      try {
        await this.taskService.createTask(this.taskForm.value);
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error al crear la tarea:', error);
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}