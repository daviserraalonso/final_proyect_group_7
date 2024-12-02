import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchTeachersComponent } from '../../../components/public/search-teachers/search-teachers.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() dialog = inject(MatDialogRef<SearchTeachersComponent>, {optional: true})

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response && response.user) {

            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            localStorage.setItem('url_rol', response.redirectTo)

            console.log(response.redirectTo)
            if(this.router.url.includes('looking-teachers') && this.dialog) return this.dialog.close()

            this.router.navigate([response.redirectTo || '/']);
            if(this.dialog) {
              this.dialog.close()
            }
            
          } else {
            console.error('response don´t have property.');
          }
        },
        error: (error: any) => {
          console.error('wrong in login:', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid credential. please try again.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        },
      });
    }
  }
}
