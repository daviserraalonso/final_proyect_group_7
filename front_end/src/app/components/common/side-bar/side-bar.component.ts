import { Component, ViewChild, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, MatMenuModule, MatDividerModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  isAuthenticated: boolean = false;

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
    // Obtiene el estado de autenticación al cargar el componente
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();  // Llama al método logout de AuthService
    this.router.navigate(['/login']);  // Redirige a la página de inicio de sesión o inicio
  }
}
