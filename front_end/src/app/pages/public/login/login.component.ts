import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-service.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

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
          console.log('Respuesta del servidor:', response);
  
          if (response && response.user) {
            // Redirigir según el rol del usuario
            switch (response.user.role) {
              case 'admin':
                this.router.navigate(['/admin']);
                break;
              case 'teacher':
                this.router.navigate(['/teacher']);
                break;
              case 'student':
                this.router.navigate(['/student']);
                break;
              default:
                this.router.navigate(['/']);
            }
          } else {
            console.error('La respuesta no contiene la propiedad user.');
          }
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
        },
        complete: () => {
          console.log('Petición de inicio de sesión completada');
        }
      });
    }
  }
  
}
