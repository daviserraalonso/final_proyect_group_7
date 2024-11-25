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
import { IUser } from '../../../../interfaces/iUser';
import { UserServiceService } from '../../../../service/user-service.service';

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
  serviceStudentDetails = inject(UserServiceService)
  taskService = inject(TaskService)

  studentProfile: IUser = {
    id: 0,
    name: '',
    email: '',
    details: {
      phone: '',
      address: '',
      img_url: '',
      description: ''
    }
  };

  arrCourses: ProgressResponse[] = [];

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
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id || 6; // Default to 6 if user ID is not found

      this.studentProfile = await this.serviceStudentDetails.getUserDetails(6);
      this.arrCourses = await this.serviceStudentProfile.getProgressByUserId(6);
      this.tasks = await this.taskService.getTasksByUserId(6);
      console.log(this.tasks)
      console.log(this.studentProfile);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
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