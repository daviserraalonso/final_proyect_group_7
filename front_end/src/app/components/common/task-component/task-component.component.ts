import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../../interfaces/itask';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css']
})
export class TaskComponentComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['tarea_comentarios', 'materia_nombre', 'profesor_nombre', 'actions'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { tasks: Task[] }, private dialog: MatDialog) {
    this.tasks = data.tasks;
  }

  ngOnInit(): void {
    // No need to fetch tasks here, they are passed via data
  }

  openTaskForm(task: Task): void {
    this.dialog.open(TaskFormComponent, {
      data: {
        taskId: task.tarea_id,
        tarea_comentarios: task.tarea_comentarios,
        materia_nombre: task.materia_nombre,
        profesor_nombre: task.profesor_nombre
      },
      width: '100%',
      height: '100%'
    });
  }
}