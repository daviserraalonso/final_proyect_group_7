import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicOfferingsService } from '../../../../service/academic-offerings.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { OnlineCoursesInscriptionComponent } from '../online-inscription.component/online-inscription.component.component';



@Component({
  selector: 'app-online-courses',
  standalone: true,
  templateUrl: './online-courses.component.html',
  styleUrls: ['./online-courses.component.css'],
  providers: [AcademicOfferingsService],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    OnlineCoursesInscriptionComponent,
    
  ],
})
export class OnlineCoursesComponent {
  courses$: Observable<any[]>;

  constructor(
    private academicService: AcademicOfferingsService,
    private dialog: MatDialog
  ) {
    this.courses$ = this.academicService.getOnlineCourses();
  }


  openModal(course: any): void {
    const dialogRef = this.dialog.open(OnlineCoursesInscriptionComponent, {
      width: '50%',
      data: { courseName: course.name, courseId: course.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Usuario inscrito: ${result.username}, Curso: ${result.courseName}`);
        
      }
    });
  }



}
