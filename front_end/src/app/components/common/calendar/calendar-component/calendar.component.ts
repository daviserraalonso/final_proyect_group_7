import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { CalendarService } from '../../../../service/calendar.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarEventComponent } from '../calendar-event/calendar-event.component';
import { CalendarEditEventComponent } from '../calendar-edit-event/calendar-edit-event.component';
import listPlugin from '@fullcalendar/list';
import { createEventId } from '../../../../utils/event-utils';
import { lastValueFrom } from 'rxjs';
import { ICourseEvent } from '../../../../interfaces/iCourseEvent';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'], // Corrige 'styleUrl' -> 'styleUrls'
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    timeZone: 'UTC',
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [], // Inicialmente vacío
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  currentEvents: EventApi[] = []; // Para el manejo de eventos actuales

  constructor(
    private calendarService: CalendarService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  /**
   * Carga los eventos desde el backend y los adapta al formato esperado por FullCalendar.
   */
  private async loadEvents(): Promise<void> {
    try {
      const response = await lastValueFrom(this.calendarService.getCalendarEvents());

      if (Array.isArray(response)) {
        const events = response.map((event) => ({
          id: event.id.toString(),
          title: event.title,
          start: new Date(event.startDateTime).toISOString(),
          end: event.endDateTime ? new Date(event.endDateTime).toISOString() : undefined,
          allDay: event.allDay || false,
          color: this.getEventColor(event.locationType || 'default'),
        }));

        this.calendarOptions.events = events;
      } else {
        console.error('Error: La respuesta no es un array.');
      }
    } catch (err) {
      console.error('Error al cargar eventos:', err);
    }
  }

  private getEventColor(locationType: string): string {
    switch (locationType) {
      case 'physical':
        return 'red';
      case 'online':
        return 'green';
      default:
        return 'orange';
    }
  }

  /**
   * Maneja la selección de una fecha para crear un nuevo evento.
   * @param selectInfo Información de la selección.
   */
  private handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar;

    if (!this.canEditEvents()) {
      return;
    }

    calendarApi.unselect(); // Limpia la selección

    const newEvent: ICourseEvent = {
      id: 0,
      title: '',
      startDateTime: selectInfo.startStr,
      endDateTime: selectInfo.endStr,
      allDay: selectInfo.allDay,
      locationType: 'default',
    };

    this.openEventEditDialog(newEvent);
  }

  /**
   * Abre el diálogo para editar un evento existente.
   * @param event Información del evento a editar.
   */
  private openEventEditDialog(event: ICourseEvent): void {
    const dialogRef = this.dialog.open(CalendarEditEventComponent, {
      width: '800px',
      height: '600px',
      data: event,
    });

    dialogRef.afterClosed().subscribe((result: ICourseEvent | null) => {
      if (result) {
        if (result.id) {
          // Editar evento existente
          this.calendarService.updateCalendarEvent(result).subscribe({
            next: () => this.loadEvents(),
            error: (err) => console.error('Error al actualizar el evento:', err),
          });
        } else {
          // Crear nuevo evento
          this.calendarService.createCalendarEvent(result).subscribe({
            next: () => this.loadEvents(),
            error: (err) => console.error('Error al crear el evento:', err),
          });
        }
      }
    });
  }

  /**
   * Maneja el clic en un evento.
   * @param clickInfo Información del clic en el evento.
   */
  private handleEventClick(clickInfo: EventClickArg): void {
    if (!this.canEditEvents()) {
      this.openEventDetailsDialog(clickInfo.event);
    } else {
      const event: ICourseEvent = {
        id: Number(clickInfo.event.id),
        title: clickInfo.event.title,
        startDateTime: clickInfo.event.start?.toISOString() || '',
        endDateTime: clickInfo.event.end?.toISOString() || '',
        allDay: clickInfo.event.allDay,
        locationType: 'default', // Puedes ajustar según los datos reales
      };

      this.openEventEditDialog(event);
    }
  }

  /**
   * Abre el diálogo para ver los detalles de un evento.
   * @param event Información del evento.
   */
  private openEventDetailsDialog(event: EventApi): void {
    this.dialog.open(CalendarEventComponent, {
      width: '800px',
      data: {
        id: event.id,
        title: event.title,
        start: event.start?.toISOString(),
        end: event.end?.toISOString(),
      },
    });
  }

  /**
   * Maneja los cambios en los eventos actuales.
   * @param events Lista actual de eventos en el calendario.
   */
  private handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  /**
   * Comprueba si el usuario puede editar eventos.
   */
  canEditEvents(): boolean {
    const userRole = Number(localStorage.getItem('role'));
    return userRole === 1 || userRole === 2; // Admin (1) o Profesor (2)
  }
}
