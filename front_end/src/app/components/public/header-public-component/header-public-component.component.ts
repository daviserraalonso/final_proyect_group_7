import { Component, HostListener, EventEmitter, Output, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header-public-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule, MatIconModule],
  templateUrl: './header-public-component.component.html',
  styleUrls: ['./header-public-component.component.css']
})
export class HeaderPublicComponentComponent implements OnInit {
    isAuthenticated: boolean = false;
    showDropdown: boolean = false;
    userName: string | null = null;
    role: string = '';
    @Output() toggle = new EventEmitter<void>();

    constructor(
      private authService: AuthService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.isAuthenticated = this.authService.isAuthenticated();
        this.showDropdown = window.innerWidth <= 1300;

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
    }

    @HostListener('window:resize', [])
    onResize() {
      if (isPlatformBrowser(this.platformId)) {
        this.showDropdown = window.innerWidth <= 1300;
      }
    }

    toggleSideBar() {
      this.toggle.emit();
    }

    private getUserName(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          return userData?.name || null;
        }
      }
      return null;
    }
}
