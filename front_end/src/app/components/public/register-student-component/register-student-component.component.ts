import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../../service/user-service.service';
import { UserAttributes } from '../../../interfaces/userAttributes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-student-component',
  standalone: true,
  imports: [
    MatSelectModule, MatInputModule, 
    MatFormFieldModule, MatIconModule, 
    MatButtonModule, FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './register-student-component.component.html',
  styleUrl: './register-student-component.component.css'
})
export class RegisterStudentComponentComponent {

  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  userServices = inject(UserServiceService)
  registerStudent: FormGroup;

  constructor() {
    this.registerStudent = new FormGroup({
      roleId: new FormControl(3, []),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z]).+$/),
        Validators.pattern(/^(?=.*[A-Z]).+$/),
        Validators.pattern(/^(?=.*\d).+$/),
        Validators.pattern(/^(?=.*[@$!%*?&]).+$/),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required
      ])
    }, [this.checkPassword])
  }


  checkPassword(formValue: AbstractControl): any {
    const password = formValue.get('password')?.value;
    const repeatPassword = formValue.get('repeatPassword')?.value;
    if (password !== repeatPassword) {
      return { 'checkpassword': true }
    } else {
      return null
    }
  }

  inputControl(formControlName: string, validador: string) {
    return this.registerStudent.get(formControlName)?.hasError(validador) && this.registerStudent.get(formControlName)?.touched;
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hide2 = signal(true);
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }

  async getdataForm() {

      // create new user
      try {
        const user: UserAttributes = await this.userServices.insert(this.registerStudent.value);
        if (user.id) {
          Swal.fire({
            text: `Enhorabuena ${user.name}, te has registrado con exito`,
            width: 400,
            showConfirmButton: false,
            imageUrl: 'assets/logo.png',
            imageAlt: 'Icon image',
            imageHeight: 80,
            imageWidth: 60,
            timer: 4000
          });
    
          this.router.navigate(['']);
        }
      } catch (error) {
        console.error('Error al crear el usuario:', error);
      }
    
  }
}
