import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../../../../service/user-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-enrollment',
  standalone: true,
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDialogContent
  ],
})
export class CourseEnrollmentComponent {
  @Input() courseName!: string;
  @Input() courseId!: number;
  @Output() formSubmitted = new EventEmitter<any>();

  enrollmentForm: FormGroup;
  private userService = inject(UserServiceService);

  constructor() {
    this.enrollmentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      roleId: new FormControl(3),
    });
  }

  submitForm(): void {
    if (this.enrollmentForm.valid) {
      const formData = {
        ...this.enrollmentForm.value,
        roleId: 3,
        isEnrollment: true,
        courseId: this.courseId,
        courseName: this.courseName,
      };
  
      this.userService.insert(formData).then(
        (response) => {
          alert(`Usuario registrado y curso "${this.courseName}" asignado con éxito`);
          this.formSubmitted.emit(response);
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
        }
      );

      this.formSubmitted.emit(formData);
    }
  }
}
