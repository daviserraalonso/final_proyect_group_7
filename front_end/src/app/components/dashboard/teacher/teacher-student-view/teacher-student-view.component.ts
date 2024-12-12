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
import { TeacherServiceService } from '../../../../service/teacher-service.service';
import { TaskFormComponent } from '../../../common/task-form/task-form.component';
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
  serviceTeacherDetails = inject(TeacherServiceService);
  students: IStudent[] = [];
  userId: number = 0
  currentPage: number = 1;
  itemsPerPage: number = 8;
  
  constructor(private dialog: MatDialog) {}

  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.userId = user.id || 6;
  console.log('User ID:', this.userId);
  await this.loadStudents();
    try {
      this.students = await this.serviceTeacherDetails.getStudentsByProfessorId(this.userId);
      console.log('Estudiantes obtenidos:', this.students); //
    } catch (error) {
      console.error('Error al obtener los datos de los estudiantes:', error);
    }
  }

  async loadStudents() {
    try {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.students = await this.serviceTeacherDetails.getStudentsByProfessorId(this.userId);
      this.students = this.students.slice(startIndex, endIndex);
    } catch (error) {
      console.error('Error al obtener los datos de los estudiantes:', error);
    }
  }


  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.students.length / this.itemsPerPage) }, (_, i) => i + 1);
  }
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadStudents();
  }

  sendTask(student: IStudent): void {
    this.dialog.open(TaskFormComponent, {
      width: '400px',
      height: '400px',
      data: { 
        studentId: student.student_id,
        subjectId: student.subject_id
      }
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