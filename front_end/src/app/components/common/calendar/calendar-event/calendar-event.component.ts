import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../../../service/calendar.service';
import { ICourseEvent } from '../../../../interfaces/iCourseEvent';

@Component({
  selector: 'app-calendar-event',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.css']
})
export class CalendarEventComponent implements OnInit {
  courses: any[] = [];
  subjects: { id: number; name: string }[] = [];
  courseName: string = '';
  subjectName: string = '';
  selectedModality: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CalendarEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: ICourseEvent },
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.selectedModality = this.data.event.locationType;
    this.loadSubjectsByCourse(this.data.event.courseId);
  }


  private loadSubjectsByCourse(courseId: number): void {
    this.calendarService.getSubjectsByCourseId(courseId).subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        const subject = subjects.find((s) => s.id === this.data.event.subjectId);
        this.subjectName = subject ? subject.name : 'Materia no encontrada';
      },
      error: (err) => console.error('Error al cargar las asignaturas:', err),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
