import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../service/user-service.service';




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
    MessageComponentComponent,
    CalendarDialogComponent,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    RouterLink,
    CommonModule    
  ],

  templateUrl: './teacher-profile-component.component.html',
  styleUrl: './teacher-profile-component.component.css'
})

export class TeacherProfileComponentComponent {
  teacherProfile = {
    name: 'Ana Gómez',
    email: 'ana.gomez@example.com',
    phone: '+123456789',
    address: 'Calle Falsa 123, Ciudad, País',
    photoUrl: 'https://via.placeholder.com/150'
  };

  

  //TAREAS
  tasks: any[] = [];
  // Alumnos inscritos
  students = [
    {
      name: 'Juan Pérez',
      progress: 60
    },
    {
      name: 'María López',
      progress: 75
    },
    {
      name: 'Carlos Fernández',
      progress: 90
    }
  ];
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

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private userService: UserServiceService ) {}

  get recentMessages() {
    return this.messages.slice(-5).reverse();
  }

  ngOnInit(): void {
    this.loadStudents(); 
  }


  openMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageComponentComponent, {
      width: '600px',
      data: { students: this.students.map(student => student.name) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messages.push(result);
        this.showCustomSnackBar('Mensaje enviado');
      }
    });
  }

  showCustomSnackBar(message: string): void { 
    // Abre la snackbar con el componente personalizado
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 3000,
      data: message,
      panelClass: ['custom-snackbar']
    });
  }
  openTaskManagerDialog(): void {
    const dialogRef = this.dialog.open(TaskManagerComponentComponent, {
      width: '1000px',
      data: { students: this.students.map(student => student.name) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messages.push(result);
        this.showCustomSnackBar('Tarea enviada');
      }
    });
  }
  navigateToSection(notification: string, event?: MouseEvent): void {
    // Evitar que el evento de clic del botón cause un problema con el clic en el mat-list-item
    if (event) {
      event.stopPropagation();
    }

    if (notification.includes('tarea')) {
      this.scrollToSection('tasksSection');
    } else if (notification.includes('lección')) {
      this.scrollToSection('studentsSection');
    } else if (notification.includes('progreso')) {
      this.scrollToSection('profileSection');
    }
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  reviewTask(task: any): void {
    console.log('Revisar Tarea:', task);
    // Aquí podrías implementar lógica adicional, como abrir un diálogo para revisar o actualizar el estado de la tarea
  }

  async loadStudents(): Promise<void> {
    try {
      const users = await this.userService.getAllStudents();
      this.students = users.map(user => ({
        name: user.name,
        progress: Math.random() * 100 // Generar un valor simulado
      }));
    } catch (error) {
      console.error('Error al cargar los estudiantes:', error);
    }
  }
}


