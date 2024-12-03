
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserServiceService } from '../../../../service/user-service.service';
import { IUser } from '../../../../interfaces/iUser';
import { TaskComponentComponent } from '../../../common/task-component/task-component.component';
import { StudentProfileComponentComponent } from '../../student/student-profile-component/student-profile-component.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-teacher-student-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './teacher-student-view.component.html',
  styleUrls: ['./teacher-student-view.component.css']
})
export class TeacherStudentViewComponent implements OnInit {
  serviceStudentDetails = inject(UserServiceService);
  students: IUser[] = [];

  constructor(private dialog: MatDialog) {}

  async ngOnInit() {
    try {
    //   this.students = await this.serviceStudentDetails.getAllStudents();
    } catch (error) {
      console.error('Error al obtener los datos de los estudiantes:', error);
    }
  }

  sendTask(student: IUser): void {
    this.dialog.open(TaskComponentComponent, {
      width: '80%',
      height: '1500%',
      data: { student }
    });
  }

  sendMessage(student: IUser): void {
    this.dialog.open(MessageComponent, {
      width: '400px',
      data: { student }
    });
  }

  viewStudentDetails(student: IUser): void {
    this.dialog.open(StudentProfileComponentComponent, {
      width: '600px',
      data: { student }
    });
  }
}