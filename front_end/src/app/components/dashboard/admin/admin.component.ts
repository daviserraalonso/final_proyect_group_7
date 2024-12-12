import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MessageComponentComponent } from '../../common/message/message-component/message-component.component';
import { CustomSnackbarComponent } from '../../common/custom-snackbar/custom-snackbar.component';
import { FormsModule } from '@angular/forms';
import { TaskManagerComponentComponent } from '../../common/task-manager-component/task-manager-component.component';
import { TeacherServiceService } from '../../../service/teacher-service.service';
import { DashboardStudentService } from '../../../service/dashboard-student.service';
import { IEarnings } from '../../../interfaces/iearnings';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { CourseService } from '../../../service/course.service';
import { UserServiceService } from '../../../service/user-service.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    NgxChartsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  

  // Fecha seleccionada
  selectedDate: Date | null = null;
  selectedFile: File | null = null;
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  coursesSerivce = inject(CourseService);
  serviceStudentProfile = inject(DashboardStudentService);
  userService = inject(UserServiceService)

  data: { name: string; value: number }[] = [];
  earningsData: { name: string; value: number }[] = [];
  pendingTasksData: { name: string; value: number }[] = [];
  coursesData: { name: string; value: number }[] = [];
  teachersData: { name: string; value: number }[] = [];

  colorScheme: Color = {
    name: 'default',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  async ngOnInit() {
    try {
      // Llama al método para obtener el conteo de estudiantes
      const studentCount = await this.userService.getTotalStudents();
      this.data = [
        {
          name: 'Estudiantes',
          value: studentCount.totalStudents
        }
      ];
      // Llama al método para obtener las ganancias
      // const earningsResponse = await this.teacherService.getEarnings();
      // this.earningsData = earningsResponse.map((earning: IEarnings) => ({
      //   name: earning.name,
      //   value: parseFloat(earning.totalEarnings) || 0
      // }));

      
      // Llama al método para obtener el conteo de cursos
      const studentCountResponse = await this.coursesSerivce.getTotalCourses()
      this.coursesData = [
        {
          name: 'Cursos',
          value: studentCountResponse.totalCourses
        }
      ];

      // Llama al método para obtener el conteo de profesores
      const teachersCountResponse = await this.userService.getTotalProfessors();
      this.teachersData = [
        {
          name: 'Profesores',
          value: teachersCountResponse.totalProfessors
        }
      ];
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  

}


