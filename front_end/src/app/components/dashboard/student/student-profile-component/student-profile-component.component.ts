import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule, MatGridTileText } from '@angular/material/grid-list';
@Component({
  selector: 'app-student-profile-component',
  standalone: true,
  imports: [MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,

    ],
  templateUrl: './student-profile-component.component.html',
  styleUrls: ['./student-profile-component.component.css']
})
export class StudentProfileComponentComponent  {
  

  studentProfile = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+123456789',
    address: 'Calle Falsa 123, Ciudad, País',
    photoUrl: 'https://via.placeholder.com/150'
  };

  // Cursos inscritos
  courses = [
    {
      name: 'Matemáticas Avanzadas',
      teacher: 'Prof. Ana Gómez',
      progress: 60
    },
    {
      name: 'Historia del Arte',
      teacher: 'Prof. Carlos López',
      progress: 50
    },
    {
      name: 'Ciencias Naturales',
      teacher: 'Prof. María Fernández',
      progress: 90
    }
  ];

  // Notificaciones
  notifications = [
    'Tienes una nueva tarea en el curso de Matemáticas Avanzadas.',
    'El profesor Carlos López ha publicado una nueva lección en Historia del Arte.',
    'Tu progreso en Ciencias Naturales ha sido actualizado.'
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
