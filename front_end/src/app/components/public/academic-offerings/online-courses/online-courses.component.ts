import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicOfferingsService } from '../../../../service/academic-offerings.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-online-courses',
  standalone: true,
  templateUrl: './online-courses.component.html',
  styleUrls: ['./online-courses.component.css'],
  providers: [AcademicOfferingsService],
  imports: [
    CommonModule
  ],
})
export class OnlineCoursesComponent {
  courses$: Observable<any[]>;

  constructor(private academicService: AcademicOfferingsService) {
    this.courses$ = this.academicService.getOnlineCourses();
  }
}
