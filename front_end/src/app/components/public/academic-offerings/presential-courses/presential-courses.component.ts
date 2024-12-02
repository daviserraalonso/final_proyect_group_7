import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AcademicOfferingsService } from '../../../../service/academic-offerings.service';
import { PresentialCoursesInscriptionComponent } from '../presential-courses-inscription/presential-courses-inscription.component';

@Component({
  selector: 'app-presential-courses',
  standalone: true,
  templateUrl: './presential-courses.component.html',
  styleUrls: ['./presential-courses.component.css'],
  providers: [AcademicOfferingsService],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    PresentialCoursesInscriptionComponent,
    
  ],
})
export class PresentialCoursesComponent {
  courses$: Observable<any[]>;

  constructor(
    private academicService: AcademicOfferingsService,
    private dialog: MatDialog
  ) {
    this.courses$ = this.academicService.getPresentialCourses();
  }

  openModal(course: any): void {
    const dialogRef = this.dialog.open(PresentialCoursesInscriptionComponent, {
      width: '50%',
      data: { courseName: course.name, courseId: course.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Usuario inscrito: ${result.username}, Curso: ${result.courseName}`);
        alert(`Inscripción confirmada para el curso: ${result.courseName}`);
      }
    });
  }
}
