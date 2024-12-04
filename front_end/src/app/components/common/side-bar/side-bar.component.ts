import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    MatIconModule, 
    MatTooltipModule, 
    MatMenuModule, 
    MatDividerModule, 
    MatListModule,
    RouterLink, 
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  isAuthenticated: boolean = false;
  role: string = '';
  screenWidth: number;
  isMobileMenuOpen: boolean = false;

  studentProfile = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+123456789',
    address: 'Calle Falsa 123, Ciudad, País',
    photoUrl: 'https://via.placeholder.com/150'
  };

  courses = [
    {
      name: 'Matemáticas Avanzadas',
      teacher: 'Prof. Ana Gómez',
      progress: 60
    },
    // ... other courses
  ];

  notifications = [
    'Tienes una nueva tarea en el curso de Matemáticas Avanzadas.',
    'El profesor Carlos López ha publicado una nueva lección en Historia del Arte.',
    'Tu progreso en Ciencias Naturales ha sido actualizado.'
  ];

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    
    // Close mobile menu when switching to desktop view
    if (!this.isMobileView()) {
      this.isMobileMenuOpen = false;
    }
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      const role = this.authService.getRole();
      if (role) {
        this.role = role;
      }
    }
  }

  isMobileView(): boolean {
    return this.screenWidth <= 768;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}