import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header-public-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './header-public-component.component.html',
  styleUrl: './header-public-component.component.css'
})
export class HeaderPublicComponentComponent {
  isAuthenticated = false;
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
      this.userName = this.isAuthenticated ? this.getUserName() : null;
    });
  }

  // get user name from local storage or sesion
  private getUserName(): string | null {
    const user = localStorage.getItem('user');
    console.log(user)
    if (user) {
      const userData = JSON.parse(user);
      return userData?.name || null;
    }
    return null;
  }


}
