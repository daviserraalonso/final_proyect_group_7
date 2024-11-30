import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { StudentServiceService } from '../../../../service/student-service.service';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScoreTeachersComponent } from '../score-teachers/score-teachers.component';
import { CourseService } from '../../../../service/course.service';
import { ScoreService } from '../../../../service/score.service';

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


    verifyScore() {

    }
  curse: any
  openScoreModal(cursoId: number) {
    console.log(cursoId)
    this.courseServices.getCourseById(cursoId).subscribe(async (response) => {
      this.curse = response
      console.log(this.curse)

      const user = localStorage.getItem('user');
      const userId = user ? JSON.parse(user).id : null; 
      const params = new HttpParams().set('studentId', userId).set('idCourse', cursoId)
      console.log(params)
      const scoreValid = await this.scoreServices.getScoreByIds(params)
      if(scoreValid) {
        return alert('Ya has valorado este curso')
      }
      this.dialog.open(ScoreTeachersComponent, {
        width: '400px',
        data: {user: userId,
               course: this.curse
        }
      })



    })
  
  }
}
