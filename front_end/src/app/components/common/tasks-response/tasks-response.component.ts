import { Component, Inject } from '@angular/core';
import { TaskService, TaskUpdate } from '../../../service/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-tasks-response',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule,MatDialogModule, MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule,],
  templateUrl: './tasks-response.component.html',
  styleUrls: ['./tasks-response.component.css']
})
export class TasksResponseComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number, tarea_comentarios: string, materia_nombre: string, profesor_nombre: string }
  ) {
    console.log('Datos inyectados:', data); 
    this.taskForm = this.fb.group({
      comments: [{ value: data.tarea_comentarios, disabled: true }, Validators.required],
      submission: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.taskForm.valid) {
      try {
        const formValue: TaskUpdate = {
          submission: this.taskForm.value.submission
        };
        console.log('Datos enviados:', JSON.stringify(formValue), 'Task ID:', this.data.taskId); // Añadir log para verificar los datos enviados
        const response = await this.taskService.updateTask(this.data.taskId, formValue);
        console.log('Respuesta de la API:', JSON.stringify(response)); // Añadir log para verificar la respuesta de la API
        this.dialogRef.close(formValue);
      } catch (error) {
        console.error('Error al enviar la actualización de la tarea:', error);
      }
    } else {
      console.error('Formulario inválido.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}


