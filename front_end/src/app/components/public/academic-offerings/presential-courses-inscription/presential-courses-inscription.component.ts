import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CourseEnrollmentComponent } from '../course-enrollment/course-enrollment.component';

@Component({
  selector: 'app-presential-courses-inscription',
  standalone: true,
  template: `
    <app-course-enrollment
      [courseName]="data.courseName"
      [courseId]="data.courseId"
      (formSubmitted)="handleFormSubmission($event)"
    ></app-course-enrollment>
  `,
  imports: [
    MatDialogModule,
    CourseEnrollmentComponent, // inscription component
  ],
})
export class PresentialCoursesInscriptionComponent {
  constructor(
    public dialogRef: MatDialogRef<PresentialCoursesInscriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { courseName: string, courseId: number } // course data
  ) {}

  handleFormSubmission(formData: any): void {
    console.log('Datos de inscripción:', formData);
    this.dialogRef.close(formData); // close modal and sent data to parent component
  }
}
