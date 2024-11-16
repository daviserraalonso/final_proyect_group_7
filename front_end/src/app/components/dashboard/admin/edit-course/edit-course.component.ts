import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../../service/course.service';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent {
  course: { id: number; name: string };

  constructor(
    private dialogRef: MatDialogRef<EditCourseComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string }
  ) {
    this.course = { ...data }; // Inicializa el curso con los datos proporcionados
  }

  save(): void {
    this.courseService.updateCourse(this.course.id, { name: this.course.name }).subscribe(
      () => {
        console.log('Curso actualizado:', this.course);
        this.dialogRef.close(this.course); // Devuelve los datos actualizados al cerrar el modal
      },
      (error) => {
        console.error('Error al actualizar el curso:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close(); // Cierra el modal sin guardar
  }
}
