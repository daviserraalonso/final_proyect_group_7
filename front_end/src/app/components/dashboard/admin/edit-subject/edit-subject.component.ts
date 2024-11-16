import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { CourseService } from '../../../../service/course.service';
import { SubjectService } from '../../../../service/subject.service';


@Component({
  selector: 'app-edit-subject',
  standalone: true,
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    NgIf,
    NgFor,
  ], 
})
export class EditSubjectComponent implements OnInit {
  subject: any;
  courses: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditSubjectComponent>,
    private courseService: CourseService,
    private subjectService: SubjectService,
  ) {
    this.subject = { ...data };
  }

  ngOnInit(): void {
    this.subject = { ...this.data }; // Clonar la asignatura
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  save(): void {
    this.subjectService.updateSubject(this.subject).subscribe(
      (updatedSubject) => {
        console.log('Asignatura actualizada en DB:', updatedSubject);
        this.dialogRef.close(updatedSubject); // Devuelve los datos actualizados al cerrar
      },
      (error) => {
        console.error('Error al actualizar asignatura:', error);
      }
    );
  }

  cancel(): void {
    this.dialogRef.close(); // Cierra el modal sin guardar cambios
  }
}
