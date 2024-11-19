import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { UserServiceService } from '../../../../service/user-service.service';
import { CourseService } from '../../../../service/course.service';



@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  course = {
    name: '',
    categoryId: null,
    modalityId: null,
    teacherId: null,
  };
  categories: any[] = [];
  modalities: any[] = [];
  teachers: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateCourseComponent>,
    private userService: UserServiceService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
    this.loadCategories();
    this.loadModalities();
  }

  loadTeachers(): void {
    this.userService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        console.error('Error al cargar profesores:', error);
      }
    );
  }


  loadCategories(): void {
    this.courseService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  loadModalities(): void {
    this.courseService.getModalities().subscribe(
      (data) => {
        this.modalities = data;
      },
      (error) => {
        console.error('Error al cargar modalidades:', error);
      }
    );
  }

  save(): void {
    this.courseService.createCourse(this.course).subscribe(
      (result) => {
        console.log('Curso creado:', result);
        this.dialogRef.close(result);
      },
      (error) => {
        console.error('Error al crear curso:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
