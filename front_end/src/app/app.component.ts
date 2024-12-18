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
    CommonModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  userRole: string | null = null;
  isSidebarOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated(); // get status login
    this.userRole = this.authService.getRole(); // get role user

    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }
 
  toggleSideBar(): void {
    this.isAuthenticated = !this.isAuthenticated;
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
