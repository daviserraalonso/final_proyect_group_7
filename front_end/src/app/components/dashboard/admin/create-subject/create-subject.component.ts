import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../../../service/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../../../../service/subject.service'; // Asegúrate de tener el servicio importado



@Component({
  selector: 'app-create-subject',
  standalone: true,
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class CreateSubjectComponent implements OnInit {
  subject: any = {
    id: null,
    name: '',
    courseId: null,
    description: '',
    finalGrade: null,
  };

  courses: { id: number; name: string }[] = []; 

  constructor(
    private dialogRef: MatDialogRef<CreateSubjectComponent>,
    private courseService: CourseService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data; // Asignar cursos disponibles
      },
      (error) => {
        console.error('Error cargando cursos:', error);
      }
    );
  }

  save(): void {
    console.log('Intentando guardar asignatura:', this.subject);

    // Valida campos requeridos antes de hacer la llamada
    if (!this.subject.name || !this.subject.courseId) {
      console.error('El nombre y el curso son obligatorios.');
      return;
    }

    // Llama al servicio para guardar la asignatura
    this.subjectService.createSubject(this.subject).subscribe(
      (response) => {
        console.log('Asignatura creada en la base de datos:', response);
        this.dialogRef.close(response); // Devuelve los datos al cerrar el modal
      },
      (error) => {
        console.error('Error al guardar la asignatura:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(); // Cierra el modal sin guardar
  }
}
