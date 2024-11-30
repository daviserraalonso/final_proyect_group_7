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
import { EditUserModalComponent } from '../../admin/edit-user-modal/edit-user-modal.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CourseService } from '../../../../service/course.service';
import { ScoreTeachersComponent } from '../score-teachers/score-teachers.component';
import { response } from 'express';

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
  serviceStudentProfile = inject(DashboardStudentService);
  serviceStudentDetails = inject(UserServiceService);
  taskService = inject(TaskService);

  userId: number = 0; // Almacenamos el ID del usuario
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
  tasks: Task[] = [];
 


  // Notificaciones
  notifications = [
    'Tienes una nueva tarea en el curso de Matemáticas Avanzadas.',
    'El profesor Carlos López ha publicado una nueva lección en Historia del Arte.',
    'Tu progreso en Ciencias Naturales ha sido actualizado.'
  ];

  constructor(private dialog: MatDialog, private courseService: CourseService) {}

  async ngOnInit() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userId = user.id || 6; // asign id or use deafult value

      // call to services
      this.studentProfile = await this.serviceStudentDetails.getUserDetails(this.userId);
      console.log(this.userId)
      this.arrCourses = await this.serviceStudentProfile.getProgressByUserId(this.userId);
      this.tasks = await this.taskService.getTasksByUserId(this.userId);
      console.log(this.arrCourses)
      console.log('Tareas:', this.tasks);
      console.log('Perfil del estudiante:', this.studentProfile);

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

  openEditUserModal(): void {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '400px',
      data: this.studentProfile
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // update student profile
        this.serviceStudentDetails.getUserDetails(this.studentProfile.id).then(updatedProfile => {
          this.studentProfile = updatedProfile;
        }).catch(error => {
          console.error('Error al actualizar el perfil del estudiante:', error);
        });
      }
    });
  }

  viewSubscribedCourses(): void {
    this.courseService.getUserSubscribedCourses(this.userId).subscribe((response) => {
      console.log('Cursos recibidos:', response);
  
      if (response.courses.length === 1) {
        // show details if only have one course
        this.dialog.open(CourseDetailsComponent, {
          data: { course: response.courses[0] }, // pass course to modal
          width: '600px',
        });
      } else if (response.courses.length > 1) {
        // show list if have any courses
        this.dialog.open(CourseDetailsComponent, {
          data: { courses: response.courses }, // pass data to modal
          width: '600px',
        });
      } else {
        console.log('No hay cursos suscritos para este usuario.');
      }
    });
  }

}
