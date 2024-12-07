import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  courses: any[] = []; // Almacena los cursos del profesor
  locations: { id: number; type: string }[] = [];
  subjects: { id: number; name: string }[] = []; // Almacena las asignaturas por curso seleccionado

  constructor(
    public dialogRef: MatDialogRef<CalendarEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICourseEvent,
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private searchService: SearchServiceService
  ) {
    // Inicializa el formulario con los datos del evento
    this.eventForm = this.fb.group({
      title: [data.title, [Validators.required]],
      start: [this.toLocalDateTime(data.startDateTime), [Validators.required]],
      end: [this.toLocalDateTime(data.endDateTime), [Validators.required]],
      description: [data.description],
      locationType: [data.locationType, [Validators.required]], // Predeterminado: 'physical'
      locationId: [data.locationId || null], // Opcional si es físico
      onlineLink: [data.onlineLink || ''], // Opcional si es online
      courseId: [data.courseId, [Validators.required]],
      subjectId: [data.subjectId, [Validators.required]],
      professorId: [data.professorId, [Validators.required]],
      allDay: [data.allDay || false],
      isRead: [data.isRead || false],
    });
  }

  ngOnInit(): void {
    this.loadCoursesByProfessor(); // Carga los cursos al inicializar el componente
    this.listenToCourseSelection(); // Configura la escucha de cambios en el curso seleccionado
    this.loadModalities();
  }

  toLocalDateTime(date: string): string {
    const utcDate = new Date(date);
    return utcDate.toISOString().slice(0, 16);
  }



  loadModalities(): void {
    this.searchService.getAllModalities()
      .then((modalities) => {
        this.locations = modalities; // Almacena las modalidades en `locations`
        console.log('Modalidades cargadas:', this.locations);
      })
      .catch((err) => {
        console.error('Error al cargar las modalidades:', err);
      });
  }




  async loadCoursesByProfessor() {
    try {
      console.log('Cargando cursos por profesor...');

      const userString = localStorage.getItem('user');
      if (!userString) {
        console.error('No se encontró el usuario en localStorage.');
        return;
      }

      const user = JSON.parse(userString);
      const professorId = user.id;

      if (!professorId) {
        console.error('El ID del profesor no está definido.');
        return;
      }

      this.calendarService.getCoursesByProfessorId(professorId).subscribe({
        next: (response: any[]) => {
          console.log('Cursos cargados:', response);
          this.courses = response;
        },
        error: (error) => {
          console.error('Error al cargar los cursos:', error);
        }
      });
    } catch (error) {
      console.error('Error en loadCoursesByProfessor:', error);
    }
  }

  listenToCourseSelection(): void {
    this.eventForm.get('courseId')?.valueChanges.subscribe((selectedCourseId) => {
      if (selectedCourseId) {
        this.loadSubjectsByCourse(selectedCourseId);
      } else {
        this.subjects = []; // Limpia las asignaturas si no hay curso seleccionado
      }
    });
  }

  loadSubjectsByCourse(courseId: number): void {
    this.calendarService.getSubjectsByCourseId(courseId).subscribe({
      next: (subjects) => {
        console.log('Asignaturas cargadas:', subjects);
        this.subjects = subjects;
      },
      error: (err) => {
        console.error('Error al cargar las asignaturas:', err);
      },
    });
  }

  deleteEvent(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.calendarService.deleteCalendarEvent(Number(this.data.id)).subscribe({
        next: () => {
          console.log('Evento eliminado exitosamente');
          this.dialogRef.close({ deleted: true, id: this.data.id });
        },
        error: (err) => {
          console.error('Error al eliminar el evento:', err);
        },
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
        next: (result) => {
          console.log('Evento guardado:', result);
          this.dialogRef.close(result);
        },
        error: (err) => {
          console.error('Error al guardar el evento:', err);
        },
      });
    }
  }
}