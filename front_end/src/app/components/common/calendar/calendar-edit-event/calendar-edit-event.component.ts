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
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendar-edit-event',
  templateUrl: './calendar-edit-event.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
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

  eventTypes: string[] = ['task', 'class'];

  isNewEvent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CalendarEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: ICourseEvent; isNew: boolean },
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef
  ) {
    this.isNewEvent = data.isNew;
    const userString = localStorage.getItem('user');
    let professorId = 0;

    if (userString) {
      try {
        const user = JSON.parse(userString);
        professorId = user?.id || 0;
      } catch (error) {
        console.error('Error al parsear el usuario desde localStorage:', error);
      }
    }

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
      professorId: [data.event.professorId || professorId, [Validators.required]],
      eventType: [data.event.eventType || null],
      allDay: [data.event.allDay || false],
      isRead: [data.event.isRead || false],
    });


    this.selectedModality = data.event.locationType;
  }
  ngOnInit(): void {
    console.log('Datos iniciales del formulario:', this.eventForm.value);

    this.eventForm.patchValue({
      start: this.toLocalDateTime(this.data.event.startDateTime),
      end: this.toLocalDateTime(this.data.event.endDateTime),
    });

    this.updateFieldStates();


    this.loadCoursesByProfessor();
    this.listenToCourseSelection();


    const courseId = this.eventForm.get('courseId')?.value;
    if (courseId) {
      this.loadSubjectsByCourse(courseId);
    }

    this.cdr.detectChanges();
  }


  toLocalDateTime(date: string): string {
    return date.slice(0, 16);
  }


  toUtcDateTime(date: string): string {
    const localDate = new Date(date); //Fecha ingresada en el formulario en la zona local
    return localDate.toISOString(); //Convierte a formato UTC para el backend
  }

  onModalityChange(modality: string): void {
    this.selectedModality = modality; //Actualiza la modalidad seleccionada
    this.eventForm.patchValue({ locationType: modality }); //actualizamos el formulario
    this.updateFieldStates(); //ajustamos los estados de los campos
  }

  updateFieldStates(): void {
    if (this.selectedModality === 'Presential') {
      this.eventForm.get('onlineLink')?.disable();
      this.eventForm.get('locationId')?.enable();
    } else if (this.selectedModality === 'Online') {
      this.eventForm.get('locationId')?.disable();
      this.eventForm.get('onlineLink')?.enable();
    }
  }

  deleteEvent(): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este evento?');
    if (confirmation) {
      //Se convierte el ID a número si es un string para cuadrar
      const eventId = typeof this.data.event.id === 'string' ? Number(this.data.event.id) : this.data.event.id;

      this.calendarService.deleteCalendarEvent(eventId).subscribe({
        next: () => {
          Swal.fire({
            text: 'Evento eliminado correctamente.',
            width: 400,
            showConfirmButton: false,
            imageUrl: 'assets/logo.png',
            imageAlt: 'Icon image',
            imageHeight: 80,
            imageWidth: 60,
            timer: 2500
          });
          this.dialogRef.close('deleted');
        },
        error: (err) => {
          console.error('Error al eliminar el evento:', err);
          Swal.fire({
            text: 'Ocurrió un error al intentar eliminar el evento.',
            width: 400,
            showConfirmButton: false,
            imageUrl: 'assets/logo.png',
            imageAlt: 'Icon image',
            imageHeight: 80,
            imageWidth: 60,
            timer: 2500
          });
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
        ...this.data.event,
        ...this.eventForm.value,
        startDateTime: this.toUtcDateTime(this.eventForm.value.start),
        endDateTime: this.toUtcDateTime(this.eventForm.value.end),
      };

      console.log('Datos enviados al backend:', updatedEvent);

      const saveObservable = this.isNewEvent
        ? this.calendarService.createCalendarEvent(updatedEvent)
        : this.calendarService.updateCalendarEvent(updatedEvent);

      saveObservable.subscribe({
        next: (result) => {
          console.log('Evento guardado:', result);
          this.dialogRef.close(result);
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
