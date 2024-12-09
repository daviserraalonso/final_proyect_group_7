import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../../service/task.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule,MatDialogModule, MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule]
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { studentId: number, subjectId: number }
  ) {
    console.log('Datos inyectados:', data); 
    this.taskForm = this.fb.group({
      studentId: [data.studentId, Validators.required],
      subjectId: [data.subjectId, Validators.required],
      comments: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  async onSubmit() {
    console.log('Formulario enviado:', this.taskForm.value); // Agrega este console.log para ver los datos del formulario
    if (this.taskForm.valid) {
      try {
        const response = await this.taskService.createTask(this.taskForm.value);
        console.log('Respuesta del backend:', response); 
        console.log('Tarea creada exitosamente'); 
        this.dialogRef.close(true); 
      } catch (error) {
        console.error('Error al crear la tarea:', error);
      }
    } else {
      console.log('Formulario inválido'); 
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}