import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CalendarService } from '../../../../service/calendar.service';
import { ICourseEvent } from '../../../../interfaces/iCourseEvent';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchServiceService } from '../../../../service/search-service.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-calendar-edit-event',
  templateUrl: './calendar-edit-event.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  styleUrls: ['./calendar-edit-event.component.css'],
})
export class CalendarEditEventComponent implements OnInit {
  eventForm: FormGroup;
  courses: any[] = [];
  locations: { id: number; type: string }[] = [];
  subjects: { id: number; name: string }[] = [];
  selectedModality: string | null = null;
  locationDisplay: string = ''; // Para mostrar address o onlineLink dinámicamente

  constructor(
    public dialogRef: MatDialogRef<CalendarEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICourseEvent,
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private searchService: SearchServiceService,
    private cdr: ChangeDetectorRef // Inyección de ChangeDetectorRef
  ) {
    this.eventForm = this.fb.group({
      title: [data.title, [Validators.required]],
      start: [this.toLocalDateTime(data.startDateTime), [Validators.required]],
      end: [this.toLocalDateTime(data.endDateTime), [Validators.required]],
      description: [data.description],
      locationType: [data.locationType || null, [Validators.required]],
      locationId: [data.locationId || null],
      onlineLink: [data.onlineLink || ''],
      courseId: [data.courseId, [Validators.required]],
      subjectId: [data.subjectId, [Validators.required]],
      professorId: [data.professorId, [Validators.required]],
      allDay: [data.allDay || false],
      isRead: [data.isRead || false],
    });

    this.selectedModality = data.locationType;
  }

  ngOnInit(): void {
    this.loadCoursesByProfessor();
    this.listenToCourseSelection();

    if (this.eventForm.get('courseId')?.value) {
      this.loadSubjectsByCourse(this.eventForm.get('courseId')?.value);
    }

    this.loadModalities();

    const locationTypeValue = this.eventForm.get('locationType')?.value;
    const onlineLinkValue = this.eventForm.get('onlineLink')?.value;

    if (onlineLinkValue) {
      this.selectedModality = 'Online';
    } else {
      this.selectedModality = locationTypeValue || 'Presential';
    }

    this.eventForm.patchValue({ locationType: this.selectedModality });

    console.log('Llamando a loadLocationDisplay');
    this.loadLocationDisplay();
  }



  toLocalDateTime(date: string): string {
    const utcDate = new Date(date);
    return utcDate.toISOString().slice(0, 16);
  }

  onModalityChange(modality: string): void {
    this.selectedModality = modality;
    this.eventForm.patchValue({ locationType: modality });

    if (modality === 'Presential') {
      // Preserva el enlace online, pero lo oculta
      this.eventForm.patchValue({ locationId: this.eventForm.get('locationId')?.value });
    } else if (modality === 'Online') {
      // Preserva la ubicación física, pero la oculta
      this.eventForm.patchValue({ onlineLink: this.eventForm.get('onlineLink')?.value });
    }

    this.loadLocationDisplay();
  }


  loadModalities(): void {
    this.searchService.getAllModalities()
      .then((modalities) => {
        this.locations = modalities;
      })
      .catch((err) => console.error('Error al cargar las modalidades:', err));
  }

  loadCoursesByProfessor(): void {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    const professorId = user.id;

    this.calendarService.getCoursesByProfessorId(professorId).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => console.error('Error al cargar los cursos:', err),
    });
  }

  listenToCourseSelection(): void {
    this.eventForm.get('courseId')?.valueChanges.subscribe((selectedCourseId) => {
      if (selectedCourseId) {
        this.loadSubjectsByCourse(selectedCourseId);
      } else {
        // Limpia las asignaturas si no hay curso seleccionado
        this.subjects = [];
        this.eventForm.patchValue({ subjectId: null });
      }
    });
  }

  loadSubjectsByCourse(courseId: number): void {
    this.calendarService.getSubjectsByCourseId(courseId).subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        if (subjects.length === 0) {
          console.log('No se encontraron asignaturas para el curso seleccionado.');
        }
      },
      error: (err) => {
        console.error('Error al cargar las asignaturas:', err);
      },
    });
  }



  loadLocationDisplay(): void {
    if (this.selectedModality === 'Presential') {
      const locationId = this.eventForm.get('locationId')?.value;

      if (locationId) {
        this.calendarService.getCourseLocation(locationId).subscribe({
          next: (location) => {
            this.locationDisplay = location.address || 'Dirección no especificada';
          },
          error: (err) => {
            console.error('Error al cargar la ubicación:', err);
            this.locationDisplay = 'Dirección no especificada';
          },
        });
      } else {
        this.locationDisplay = 'Dirección no especificada';
      }
    } else if (this.selectedModality === 'Online') {
      const onlineLink = this.eventForm.get('onlineLink')?.value;
      this.locationDisplay = onlineLink || 'Enlace no especificado';
    }
  }



  deleteEvent(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.calendarService.deleteCalendarEvent(Number(this.data.id)).subscribe({
        next: () => this.dialogRef.close({ deleted: true, id: this.data.id }),
        error: (err) => console.error('Error al eliminar el evento:', err),
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.eventForm.valid) {
      const updatedEvent: ICourseEvent = {
        id: this.data.id,
        ...this.eventForm.value,
      };

      const saveObservable = this.data.id
        ? this.calendarService.updateCalendarEvent(updatedEvent)
        : this.calendarService.createCalendarEvent(updatedEvent);

      saveObservable.subscribe({
        next: (result) => this.dialogRef.close(result),
        error: (err) => console.error('Error al guardar el evento:', err),
      });
    }
  }
}
