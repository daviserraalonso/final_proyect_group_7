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
  imports: [RouterOutlet, MatButtonModule, HeaderPublicComponentComponent, FooterPublicComponentComponent, IndexComponent, SearchTeachersComponent, SideBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // Cambié styleUrl a styleUrls
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Nos suscribimos al observable de autenticación del servicio
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        
      }
    );
  }
}