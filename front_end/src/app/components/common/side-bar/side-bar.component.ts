import {  Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule,MatTooltipModule,MatMenuModule,MatDividerModule,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})

export class SideBarComponent {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  openMenu() {
    this.menuTrigger.openMenu();
  }

  
  

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

