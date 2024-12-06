import { TaskService } from './../../../../service/task.service';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { IPendingTask } from '../../../../interfaces/ipending-task';
import { TeacherServiceService } from '../../../../service/teacher-service.service';
import { ITaskDetails } from '../../../../interfaces/itask-details';

@Component({
  selector: 'app-pending-tasks-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatError,
    MatListModule
  ],
  templateUrl: './pending-tasks-dialog.component.html',
  styleUrls: ['./pending-tasks-dialog.component.css']
})
export class PendingTasksDialogComponent implements OnInit {
  feedbackForm: FormGroup;
  selectedTask: any = null;
  tasks: any[] = [];
  pendingTasks: IPendingTask[] = [];
  teacherService = inject(TeacherServiceService);
   taskdetails: ITaskDetails | null = null;
  TaskService= inject(TaskService);
  

  constructor(
    public dialogRef: MatDialogRef<PendingTasksDialogComponent>,
    private fb: FormBuilder,
    
  ) {
    this.feedbackForm = this.fb.group({
      punctuation: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      submission: ['', Validators.required],
      feedback: ['', Validators.required]
    });
  }

  async ngOnInit() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id || 6; // asign id or use default value
      this.pendingTasks = await this.teacherService.getPendingTasks(3);
      this.taskdetails = await this.teacherService.getTaskDetails(3)
      console.log('Tareas pendientes:', this.pendingTasks);
    } catch (error) {
      console.error('Error al obtener las tareas pendientes:', error);
    }
  }

  selectTask(task: any): void {
    this.selectedTask = task;
    this.feedbackForm.patchValue({
      submission: this.taskdetails?.submission || ''
    });
    console.log('Tarea seleccionada:', this.selectedTask); // Añadir log para verificar el id
  }

  async onSubmit(): Promise<void> {
    if (this.feedbackForm.valid && this.selectedTask && this.selectedTask.taskId) {
      try {
        await this.TaskService.updateTask(this.selectedTask.taskId, this.feedbackForm.value);
        this.dialogRef.close(this.feedbackForm.value);
      } catch (error) {
        console.error('Error al enviar la retroalimentación:', error);
      }
    } else {
      console.error('No se ha seleccionado ninguna tarea o la tarea no tiene un id válido.');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}