import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-public-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './header-public-component.component.html',
  styleUrls: ['./header-public-component.component.css'] // Corregido: styleUrls
})
export class HeaderPublicComponentComponent implements OnInit {
    isAuthenticated: boolean = false;
  userName: string | null = null;
  role: string = '';
  @Output() toggle = new EventEmitter<void>(); // Asegúrate de importar Output y EventEmitter

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
      this.userName = this.isAuthenticated ? this.getUserName() : null;
      
    });
    if (this.isAuthenticated) {
      const role = this.authService.getRole();
      if (role) {
        this.role = role;
      }
    }
  }

  toggleSideBar() {
    this.toggle.emit(); // Emite el evento para alternar el menú
  }

  // Obtener el nombre del usuario desde localStorage o sesión
  private getUserName(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData?.name || null;
    }
    return null;
  }
}
