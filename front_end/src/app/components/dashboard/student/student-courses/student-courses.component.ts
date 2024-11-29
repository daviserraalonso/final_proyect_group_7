import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StudentServiceService } from '../../../../service/student-service.service';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class StudentCoursesComponent implements OnInit {
  studentCourses: any[] = []; // Cursos del estudiante

  constructor(private studentService: StudentServiceService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null; // get id from localstorage

    if (userId) {
      // call service to get student
      this.studentService.getStudentCourses(userId).subscribe({
        next: (courses) => {
          console.log('Cursos recibidos:', courses);
          this.studentCourses = courses;
        },
        error: (error) => {
          console.error('Error al obtener los cursos del estudiante:', error);
        },
      });
    } else {
      console.error('No se pudo obtener el ID del usuario desde el localStorage.');
    }
  }
}
