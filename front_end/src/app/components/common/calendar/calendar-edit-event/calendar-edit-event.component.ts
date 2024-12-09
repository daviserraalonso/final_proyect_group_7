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
    MatCheckboxModule,
  ],
  styleUrls: ['./calendar-edit-event.component.css'],
})
export class CalendarEditEventComponent implements OnInit {
  eventForm: FormGroup;
  courses: any[] = [];
  subjects: { id: number; name: string }[] = [];
  selectedModality: string | null = null;

  eventTypes: string[] = ['task', 'class']; // Opciones para el desplegable de tipo de evento

  isNewEvent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CalendarEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: ICourseEvent; isNew: boolean },
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef
  ) {
    this.isNewEvent = data.isNew;

    this.eventForm = this.fb.group({
      title: [data.event.title, [Validators.required]],
      start: [this.toLocalDateTime(data.event.startDateTime), [Validators.required]],
      end: [this.toLocalDateTime(data.event.endDateTime), [Validators.required]],
      description: [data.event.description, [Validators.required]],
      locationType: [data.event.locationType || null, [Validators.required]],
      locationId: [{ value: data.event.locationId || null, disabled: data.event.locationType === 'Online' }],
      onlineLink: [{ value: data.event.onlineLink || null, disabled: data.event.locationType === 'Presential' }],
      courseId: [data.event.courseId, [Validators.required]],
      subjectId: [data.event.subjectId, [Validators.required]],
      professorId: [data.event.professorId, [Validators.required]],
      eventType: [data.event.eventType || null], // Si no hay valor, se establece como null
      allDay: [data.event.allDay || false],
      isRead: [data.event.isRead || false],
    });



    this.selectedModality = data.event.locationType;
  }




  ngOnInit(): void {
    console.log('Datos iniciales del formulario:', this.eventForm.value);
    console.log('Modalidad inicial:', this.selectedModality);

    // Configura los estados de los campos según la modalidad inicial
    this.updateFieldStates();

    // Cargar datos relacionados
    this.loadCoursesByProfessor();
    this.listenToCourseSelection();

    // Carga inicial de asignaturas si ya hay un curso seleccionado
    const courseId = this.eventForm.get('courseId')?.value;
    if (courseId) {
      console.log(`Cargando asignaturas para el curso ID: ${courseId}`);
      this.loadSubjectsByCourse(courseId);
    }

    // Forzar detección de cambios después de inicializar valores
    this.cdr.detectChanges();
  }






  toLocalDateTime(date: string): string {
    const utcDate = new Date(date);
    return utcDate.toISOString().slice(0, 16);
  }

  onModalityChange(modality: string): void {
    this.selectedModality = modality; // Actualiza la modalidad seleccionada
    this.eventForm.patchValue({ locationType: modality }); // Actualiza el valor del formulario
    this.updateFieldStates(); // Ajusta los estados de los campos
  }

  updateFieldStates(): void {
    if (this.selectedModality === 'Presential') {
      this.eventForm.get('onlineLink')?.disable(); // Deshabilitar enlace online
      this.eventForm.get('locationId')?.enable(); // Habilitar ubicación física
    } else if (this.selectedModality === 'Online') {
      this.eventForm.get('locationId')?.disable(); // Deshabilitar ubicación física
      this.eventForm.get('onlineLink')?.enable(); // Habilitar enlace online
    }
  }

  deleteEvent(): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este evento?');
    if (confirmation) {
      // Convertir el ID a número si es un string
      const eventId = typeof this.data.event.id === 'string' ? Number(this.data.event.id) : this.data.event.id;

      this.calendarService.deleteCalendarEvent(eventId).subscribe({
        next: () => {
          alert('Evento eliminado correctamente.');
          this.dialogRef.close('deleted');
        },
        error: (err) => {
          console.error('Error al eliminar el evento:', err);
          alert('Ocurrió un error al intentar eliminar el evento.');
        },
      });
    }
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
        this.subjects = [];
        this.eventForm.patchValue({ subjectId: null });
      }
    });
  }

  loadSubjectsByCourse(courseId: number): void {
    this.calendarService.getSubjectsByCourseId(courseId).subscribe({
      next: (subjects) => {
        this.subjects = subjects;
      },
      error: (err) => console.error('Error al cargar las asignaturas:', err),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.eventForm.valid) {
      const updatedEvent: ICourseEvent = {
        ...this.data.event, // Mantener las propiedades originales del evento
        ...this.eventForm.value, // Reemplazar con los valores del formulario
        startDateTime: new Date(this.eventForm.value.start).toISOString(),
        endDateTime: new Date(this.eventForm.value.end).toISOString(),
      };

      const saveObservable = this.isNewEvent
        ? this.calendarService.createCalendarEvent(updatedEvent) // Crear nuevo evento
        : this.calendarService.updateCalendarEvent(updatedEvent); // Actualizar evento existente

      saveObservable.subscribe({
        next: (result) => {
          console.log('Evento guardado:', result);
          this.dialogRef.close(result); // Cierra el diálogo tras guardar
        },
        error: (err) => console.error('Error al guardar el evento:', err),
      });
    }
  }





  private capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
