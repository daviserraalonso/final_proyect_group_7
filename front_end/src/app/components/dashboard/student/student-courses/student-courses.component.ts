import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { StudentServiceService } from '../../../../service/student-service.service';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScoreTeachersComponent } from '../score-teachers/score-teachers.component';
import { CourseService } from '../../../../service/course.service';
import { ScoreService } from '../../../../service/score.service';
import Swal from 'sweetalert2';

export type ScoreValid = {
  id: number
}

@Component({
  selector: 'app-student-courses',
  standalone: true,
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css'],
  imports: [CommonModule, HttpClientModule, MatButtonModule],
})
export class StudentCoursesComponent implements OnInit {
  studentCourses: any[] = []; // Cursos del estudiante
  dialog = inject(MatDialog)
  courseServices = inject(CourseService)
  scoreServices = inject(ScoreService)

  curse: any

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



  openScoreModal(cursoId: number): void {
    this.courseServices.getCourseById(cursoId).subscribe(async (response) => {
      this.curse = response
      const user = localStorage.getItem('user');
      const userId = user ? JSON.parse(user).id : null; 
      const params = new HttpParams().set('studentId', userId).set('idCourse', cursoId)

      const scoreValid = await this.scoreServices.getScoreByIds(params)
      console.log(scoreValid)
      if(!scoreValid) {
      this.dialog.open(ScoreTeachersComponent, {
        width: '400px',
        data: {user: userId,
               course: this.curse
        }
      })
    }
    if(scoreValid) {
      Swal.fire({
        title: "Error",
        text: "Ya has valorado este curso",
        width: 400,
        confirmButtonText: `
       Ok! <i class="fa fa-thumbs-up"></i>
      `,
        imageUrl: 'assets/logo.png',
        imageAlt: 'Icon image',
        imageHeight: 80,
        imageWidth: 60,

      });
    }
    })
  }
}
