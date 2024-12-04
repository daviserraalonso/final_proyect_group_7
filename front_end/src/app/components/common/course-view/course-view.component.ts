import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../service/course.service';
import { StudentServiceService } from '../../../service/student-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent {

  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  courseServices = inject(CourseService)
  studentServices = inject(StudentServiceService)

  course!: any
  courseId!: number

  async ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
     
      this.courseId = +params['idcourse'];
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = params['idcourse']
    })
    this.courseServices.getCourseById(this.courseId).subscribe((course) => {
      this.course = course
      console.log(this.course)
    })
  })
  }

  inscription(courseId: number) {
    Swal.fire({
      title: `¿Te quieres inscribir al curso ${this.course.id}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then(async (result) => { 
      if(result.isConfirmed) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const studentId = user.id
      const dates = {
        courseId: courseId,
        studentId: studentId
      }
      const response = await this.studentServices.inscription(dates)

        Swal.fire({
          title: "Enhorabuena!",
          text: `Te has inscrito al curso ${this.course.id}`,
          icon: "success"
        });

    }})
  }
}
  
  
















   

