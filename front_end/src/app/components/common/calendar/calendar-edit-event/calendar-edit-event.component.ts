import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../../../service/calendar.service';
import { ICourseEvent } from '../../../../interfaces/iCourseEvent';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-edit-event',
  templateUrl: './calendar-edit-event.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./calendar-edit-event.component.css'],
})
export class CalendarEditEventComponent {
  eventForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CalendarEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICourseEvent,
    private fb: FormBuilder,
    private calendarService: CalendarService
  ) {
    this.eventForm = this.fb.group({
      title: [data.title, [Validators.required]],
      start: [this.formatDateTime(data.startDateTime), [Validators.required]],
      end: [this.formatDateTime(data.endDateTime), [Validators.required]],
    });
  }

  formatDateTime(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${this.pad(d.getMonth() + 1)}-${this.pad(d.getDate())}T${this.pad(d.getHours())}:${this.pad(d.getMinutes())}`;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
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
          this.dialogRef.close(result); // Devuelve el evento actualizado al componente principal
        },
        error: (err) => {
          console.error('Error al guardar el evento:', err);
        },
      });
    }
  }
}
