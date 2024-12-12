import { Component, inject, Inject, Input } from '@angular/core';
import { CommentsComponent } from "../comments/comments.component";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { StudentServiceService } from '../../../service/student-service.service';
import { SearchTeachersComponent } from '../../public/search-teachers/search-teachers.component';
import { SearchServiceService } from '../../../service/search-service.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-teacher-view',
  standalone: true,
  imports: [CommentsComponent, MatCardModule, MatIconModule, MatDialogModule, MatButtonModule, RouterOutlet, CommonModule],
  templateUrl: './teacher-view.component.html',
  styleUrl: './teacher-view.component.css'
})
export class TeacherViewComponent {


  studentServices = inject(StudentServiceService)
  searchServices = inject(SearchServiceService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  teacherdata!: any
  teacherId!: number

    constructor(
  
    ) {}

    async ngOnInit() {
    console.log('hola')
      this.activatedRoute.params.subscribe((params) => {
        this.teacherId = params['id']
      })
      const params = new HttpParams().set('userId', this.teacherId)
      console.log(params)
const response = await this.searchServices.search(params)
this.teacherdata = response[0]
console.log(this.teacherdata)
    }



    viewCurse(courseId: number, teacherId: number) {
        this.router.navigate(['teacher', teacherId, 'course', courseId ])
      }
    // async inscription(idCourse: number) {
    //   const user = JSON.parse(localStorage.getItem('user') || '{}');
      
    //   const inscription = {
    //     idUser: user.id,
    //     idCourse: idCourse,
    //   };

    //   const response = await this.studentServices.inscription(inscription)
  
    // }
 }
