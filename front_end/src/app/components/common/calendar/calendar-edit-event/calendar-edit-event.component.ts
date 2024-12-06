import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../../../service/calendar.service';
import { CourseService } from '../../../../service/course.service';
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
  courses: any[] = []; //Almacena los cursos del profesor
  locations: { id: number; name: string }[] = [];
  subjects: { id: number; name: string }[] = [];
  constructor(
    public dialogRef: MatDialogRef<CalendarEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICourseEvent,
    private fb: FormBuilder,
    private calendarService: CalendarService,
  ) {
    //Inicializa el formulario con los datos del evento
    this.eventForm = this.fb.group({
      title: [data.title, [Validators.required]],
      start: [this.toLocalDateTime(data.startDateTime), [Validators.required]],
      end: [this.toLocalDateTime(data.endDateTime), [Validators.required]],
      description: [data.description],
      locationType: [data.locationType || 'physical', [Validators.required]], // Predeterminado: 'physical'
      locationId: [data.locationId || null], // Opcional si es físico
      onlineLink: [data.onlineLink || ''], // Opcional si es online
      courseId: [data.courseId, [Validators.required]],
      subjectId: [data.subjectId, [Validators.required]],
      professorId: [data.professorId, [Validators.required]],
      allDay: [data.allDay || false],
      isRead: [data.isRead || false],
    });
    console.log('locationType en constructor:', this.eventForm.get('locationType')?.value);

    console.log(data.description)
  }

  ngOnInit(): void {
    this.loadCoursesByProfessor();
    console.log('locationType en constructor:', this.eventForm.get('locationType')?.value);
  }

  toLocalDateTime(date: string): string {
    const utcDate = new Date(date);
    return utcDate.toISOString().slice(0, 16);
  }


  async loadCoursesByProfessor() {
    try {
      console.log('Cargando cursos por profesor...');

      // Obtener el usuario desde localStorage
      const userString = localStorage.getItem('user');
      if (!userString) {
        console.error('No se encontró el usuario en localStorage.');
        return;
      }

      // Parsear el objeto usuario y obtener el ID
      const user = JSON.parse(userString);
      const professorId = user.id;

      if (!professorId) {
        console.error('El ID del profesor no está definido.');
        return;
      }

      // Llamar al servicio con el ID del profesor
      this.calendarService.getCoursesByProfessorId(professorId).subscribe({
        next: (response: ICourseEvent[]) => {
          console.log('Respuesta del servidor:', response);
          this.courses = response; // Asignar los cursos obtenidos
        },
        error: (error: any) => {
          console.error('Error al cargar los cursos:', error);
        }
      });
    } catch (error) {
      console.error('Error en loadCoursesByProfessor:', error);
    }
  }




  formatDateTime(date: string): string {
    const d = new Date(date);
    const localDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000); // Corrige el desfase horario
    return `${localDate.getFullYear()}-${this.pad(localDate.getMonth() + 1)}-${this.pad(localDate.getDate())}T${this.pad(localDate.getHours())}:${this.pad(localDate.getMinutes())}`;
  }


  pad(value: number): string {
    return value.toString().padStart(2, '0');
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
