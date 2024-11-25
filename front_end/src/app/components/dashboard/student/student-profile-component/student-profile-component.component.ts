import { TaskService } from './../../../../service/task.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../../../../interfaces/itask';
import { TaskComponentComponent } from '../../../common/task-component/task-component.component';
import { DashboardStudentService } from '../../../../service/dashboard-student.service';
import { ProgressResponse } from '../../../../interfaces/iProgressResponse';

@Component({
  selector: 'app-student-profile-component',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule
  ],
  templateUrl: './student-profile-component.component.html',
  styleUrls: ['./student-profile-component.component.css']
})
export class StudentProfileComponentComponent implements OnInit {
  serviceStudentProfile = inject(DashboardStudentService)

  studentProfile = {
    id: 5, // Asegúrate de tener el ID del estudiante
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+123456789',
    address: 'Calle Falsa 123, Ciudad, País',
    photoUrl: 'https://via.placeholder.com/150'
  };

  
  arrCourses:ProgressResponse[] = [];

  // Notificaciones
  notifications = [
    'Tienes una nueva tarea en el curso de Matemáticas Avanzadas.',
    'El profesor Carlos López ha publicado una nueva lección en Historia del Arte.',
    'Tu progreso en Ciencias Naturales ha sido actualizado.'
  ];

  tasks: Task[] = [];

  constructor(private dialog: MatDialog, private TaskService: TaskService) {}

  async ngOnInit() {
    try {
      this.arrCourses = await this.serviceStudentProfile.getProgressByUserId(this.studentProfile.id);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  }


  openTaskComponent(): void {
    this.dialog.open(TaskComponentComponent, {
      width: '80%',
      height: '1500%',
      data: { student: this.studentProfile, tasks: this.tasks }
    });
  }
}