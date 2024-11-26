import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderPublicComponentComponent } from "./components/public/header-public-component/header-public-component.component";
import { FooterPublicComponentComponent } from "./components/public/footer-public-component/footer-public-component.component";
import { IndexComponent } from "./pages/public/home/index.component";
import { SearchTeachersComponent } from "./components/public/search-teachers/search-teachers.component";
import { SideBarComponent } from './components/common/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth-service.service';  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonModule, 
    HeaderPublicComponentComponent, 
    FooterPublicComponentComponent, 
    SideBarComponent, 
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // Cambié styleUrl a styleUrls
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated(); // Obtiene el estado de autenticación actual
    this.userRole = this.authService.getRole(); // Obtiene el rol del usuario// Obtiene el rol del usuario

    // Opcionalmente, suscríbete a cambios de autenticación
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }
}
