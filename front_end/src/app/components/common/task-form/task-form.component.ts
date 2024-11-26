import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../../service/task.service';
import { Task } from '../../../interfaces/itask';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number, tarea_comentarios: string, materia_nombre: string, profesor_nombre: string },
    private taskService: TaskService
  ) {
    this.form = this.fb.group({
      resolution: ['']
    });
  }

  async submit(): Promise<void> {
    try {
      const updatedTask: Task = {
        
        submission: this.form.value.resolution
      };
      await this.taskService.updateTask(this.data.taskId, updatedTask);
      console.log(`Resolución enviada para la tarea con ID: ${this.data.taskId}`, this.form.value);
      this.dialogRef.close();
    } catch (error) {
      console.error('Error al enviar la resolución:', error);
    }
  }
}