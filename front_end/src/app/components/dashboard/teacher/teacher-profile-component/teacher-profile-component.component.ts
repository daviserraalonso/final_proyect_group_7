import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
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
import { NgFor } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MessageComponentComponent } from '../../../common/message/message-component/message-component.component';
import { CustomSnackbarComponent } from '../../../common/custom-snackbar/custom-snackbar.component';
import { CalendarDialogComponent } from '../../../common/calendar-dialog/calendar-dialog.component';
import { FormsModule } from '@angular/forms';
import { TaskManagerComponentComponent } from '../../../common/task-manager-component/task-manager-component.component';
import { IUser } from '../../../../interfaces/iUser';
import { Task } from '../../../../interfaces/itask';
import { UserServiceService } from '../../../../service/user-service.service';
import { DashboardStudentService } from '../../../../service/dashboard-student.service';
import { TaskService } from '../../../../service/task.service';
import { ProgressResponse } from '../../../../interfaces/iProgressResponse';



@Component({
  selector: 'app-teacher-profile-component',
  standalone: true,
  imports: [
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
    NgFor,
    MatDialogModule,
    MatSnackBarModule,
   
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    

    
  ],
  templateUrl: './teacher-profile-component.component.html',
  styleUrl: './teacher-profile-component.component.css'
})
export class TeacherProfileComponentComponent implements OnInit {
  serviceStudentDetails = inject(UserServiceService);
  serviceStudentProfile = inject(DashboardStudentService);
  taskService = inject(TaskService);

  userId: number = 0; // Almacenamos el ID del usuario
  teacherProfile: IUser = {
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
  

  
  //tareas
  studentTasks = [
    {
      title: 'Ensayo sobre la Revolución Francesa',
      student: 'Juan Pérez',
      description: '.......................',
      status: 'Pendiente'
    },
    {
      title: 'Ejercicios de Matemáticas',
      student: 'María López',
      description: '..............',
      status: 'Pendiente'
    }
  ];
  // Mensajes
  messages = [
    {
      subject: 'Reunión de Padres',
      content: 'Recordatorio de la reunión .'
    },
    {
      subject: 'Entrega de Tareas',
      content: 'La fecha límite para la entrega de tareas es el viernes.'
    }
  ];

  // Notificaciones
  notifications = [
    'Tienes una nueva tarea para revisar.',
    'El alumno Carlos Fernández ha completado una lección.',
    'Tu progreso en el curso de Historia del Arte ha sido actualizado.'
  ];

  // Fecha seleccionada
  selectedDate: Date | null = null;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}
  async ngOnInit() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userId = user.id || 6; // asign id or use deafult value

      // call to services
      this.teacherProfile = await this.serviceStudentDetails.getUserDetails(this.userId);
      console.log(this.userId)
      this.arrCourses = await this.serviceStudentProfile.getProgressByUserId(this.userId);
      this.tasks = await this.taskService.getTasksByUserId(this.userId);
      console.log(this.arrCourses)
      console.log('Tareas:', this.tasks);
      console.log('Perfil del estudiante:', this.teacherProfile);

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }

  }

  get recentMessages() {
    return this.messages.slice(-5).reverse();
  }

  // openMessageDialog(): void {
  //   const dialogRef = this.dialog.open(MessageComponentComponent, {
  //     width: '600px',
  //     data: { students: this.students.map(student => student.name) }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.messages.push(result);
  //       this.showCustomSnackBar('Mensaje enviado');
  //     }
  //   });
  // }

  showCustomSnackBar(message: string): void { 
    // Abre la snackbar con el componente personalizado
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 3000,
      data: message,
      panelClass: ['custom-snackbar']
    });
  }
  // openTaskManagerDialog(): void {
  //   const dialogRef = this.dialog.open(TaskManagerComponentComponent, {
  //     width: '1000px',
  //     data: { students: this.students.map(student => student.name) }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.messages.push(result);
  //       this.showCustomSnackBar('Tarea enviada');
  //     }
  //   });
  // }
 
}


