import { NgClass } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScoreService } from '../../../../service/score.service';

@Component({
  selector: 'app-score-teachers',
  standalone: true,
  imports: [MatIconModule, NgClass, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule ],
  templateUrl: './score-teachers.component.html',
  styleUrl: './score-teachers.component.css'
})
export class ScoreTeachersComponent {

  scoreService = inject(ScoreService)

  iconsTeacher = Array(5)
  iconsCourse = Array(5)

  activeIconTeacher: number = -1
  activeIconCourse: number = -1
  scoreTeacher: number = 0
  scoreCourse: number = 0

  scoreForm: FormGroup

  name: string = ""
  courseName: string = ""
  idTeacher!: number
  idCourse!: number
  studentId!: number


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ScoreTeachersComponent>
  ) {
    this.scoreForm = new FormGroup({
      studentId: new FormControl (null, []),
      scoreTeacher: new FormControl(0,[]),
      scoreCourse: new FormControl(0,[]),
      idTeacher: new FormControl(null,[]),
      idCourse: new FormControl(null, [] )
    })

    console.log(data)

    this.name = this.data.user.name
    this.courseName = this.data.course.name
    this.idTeacher = this.data.course.professor_id
    this.idCourse = this.data.course.id
    this.studentId = this.data.user.id
  

  }





  activatedIconTeacher(index: number) {
    this.activeIconTeacher = index
    this.scoreTeacher = index + 1
    console.log(this.scoreTeacher)
  } 

  activatedIconCourse(index: number) {
    this.activeIconCourse = index
    this.scoreCourse = index + 1
    console.log(this.scoreCourse)
  } 

  async getScore() {
    this.scoreForm.get('scoreTeacher')?.patchValue(this.scoreTeacher)
    this.scoreForm.get('scoreCourse')?.patchValue(this.scoreCourse)
    this.scoreForm.get('idTeacher')?.patchValue(this.idTeacher)
    this.scoreForm.get('idCourse')?.patchValue(this.idCourse)
    this.scoreForm.get('studentId')?.patchValue(this.studentId)
    console.log(this.scoreForm.value)
    const score = await this.scoreService.insertScore(this.scoreForm.value)
    this.dialogRef.close()
  }



}
