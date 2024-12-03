import { Component, ViewChild, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, MatMenuModule, MatDividerModule, RouterLink, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  isAuthenticated: boolean = false;
  role: string = '';
  role_url: string | null = ""

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // get status authenticated
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      const role = this.authService.getRole();
      if (role) {
        this.role = role; // asiggn role
      }
    }

    this.role_url = localStorage.getItem('url_rol')
    console.log(this.role_url)
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }

  // sesion destoy
  logout() {
    this.authService.logout();  // call logout function in service
    this.router.navigate(['/login']);  // redirect to home
  }
}
