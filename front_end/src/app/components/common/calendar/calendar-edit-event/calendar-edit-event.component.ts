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
  physicalLocation: string = '';
  onlineLink: string = '';

  constructor(
    public dialogRef: MatDialogRef<CalendarEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICourseEvent,
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private searchService: SearchServiceService,
    private cdr: ChangeDetectorRef // Inyección de ChangeDetectorRef

  ) {
    // Inicializa el formulario con los datos del evento
    this.eventForm = this.fb.group({
      title: [data.title, [Validators.required]],
      start: [this.toLocalDateTime(data.startDateTime), [Validators.required]],
      end: [this.toLocalDateTime(data.endDateTime), [Validators.required]],
      description: [data.description],
      locationType: ['Presential', [Validators.required]], // Valor predeterminado
      locationId: [data.locationId || null],
      onlineLink: [data.onlineLink || ''], // Control para enlace online
      physicalLocation: [data.locationType || ''], // Control para ubicación física
      courseId: [data.courseId, [Validators.required]],
      subjectId: [data.subjectId, [Validators.required]],
      professorId: [data.professorId, [Validators.required]],
      allDay: [data.allDay || false],
      isRead: [data.isRead || false],
    });
  }

  ngOnInit(): void {
    this.loadCoursesByProfessor();
    this.listenToCourseSelection();
    this.loadModalities();
  }

  toLocalDateTime(date: string): string {
    const utcDate = new Date(date);
    return utcDate.toISOString().slice(0, 16);
  }

  onModalityChange(modality: string): void {
    this.selectedModality = modality;

    if (modality === 'Presential') {
      this.eventForm.patchValue({
        onlineLink: '',
        physicalLocation: '',
      });
    } else if (modality === 'Online') {
      this.eventForm.patchValue({
        onlineLink: '',
        physicalLocation: '',
      });
    }
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
        if (subjects && subjects.length > 0) {
          this.subjects = subjects; // Asigna las asignaturas si hay datos
          console.log('Asignaturas cargadas:', this.subjects);
        } else {
          console.warn('No se encontraron asignaturas para el curso seleccionado.');
          this.subjects = []; // Limpia la lista si no hay asignaturas
        }
      },
      error: (err) => {
        console.error('Error al cargar las asignaturas:', err);
        this.subjects = []; // Limpia la lista en caso de error
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