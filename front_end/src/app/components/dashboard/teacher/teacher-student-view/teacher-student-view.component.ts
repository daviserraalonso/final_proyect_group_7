import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserServiceService } from '../../../../service/user-service.service';
import { IUser } from '../../../../interfaces/iUser';
import { IStudent } from '../../../../interfaces/iStudent';
import { TaskComponentComponent } from '../../../common/task-component/task-component.component';
import { StudentProfileComponentComponent } from '../../student/student-profile-component/student-profile-component.component';
import { MessageComponent } from '../message/message.component';
import { MessageComponentComponent } from '../../../common/message/message-component/message-component.component';
import { StudentCardComponent } from '../../student/student-card/student-card.component';


@Component({
  selector: 'app-teacher-student-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    
  ],
  templateUrl: './teacher-student-view.component.html',
  styleUrls: ['./teacher-student-view.component.css']
})
export class TeacherStudentViewComponent implements OnInit {
  serviceStudentDetails = inject(UserServiceService);
  students: IStudent[] = [
    {
      student_id: 5,
      student_name: "Goten",
      student_email: "goten@example.com",
      course_id: 1,
      course_name: "Curso 1",
      student_image: "https://robohash.org/Goten?set=set4"
    },
    {
      student_id: 7,
      student_name: "Bra",
      student_email: "bra@example.com",
      course_id: 3,
      course_name: "Curso 3",
      student_image: "https://robohash.org/Bra?set=set4"
    }
  ];

  constructor(private dialog: MatDialog) {}

  async ngOnInit() {
    try {
    //   this.students = await this.serviceStudentDetails.getAllStudents();
    } catch (error) {
      console.error('Error al obtener los datos de los estudiantes:', error);
    }
  }

  sendTask(student: IStudent): void {
    this.dialog.open(TaskComponentComponent, {
      width: '80%',
      height: '1500%',
      data: { student }
    });
  }

  sendMessage(student: IStudent): void {
    this.dialog.open(MessageComponentComponent, {
      width: '400px',
      data: { students: [student.student_name] }
    });
  }

  viewStudentDetails(student: IStudent): void {
    this.dialog.open(StudentCardComponent, {
      width: '600px',
      data: { student }
    });
  }
}