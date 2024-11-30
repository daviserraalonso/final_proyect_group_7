import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { CalendarService } from '../../../service/calendar.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from '../../../utils/event-utils';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
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
    private changeDetector: ChangeDetectorRef
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

      // Validar si la respuesta es un array
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
        console.log('Eventos asignados a calendarOptions.events:', this.calendarOptions.events);
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
        return 'orange'; // Color por defecto si no coincide con ningún tipo
    }
  }


  private handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Ingresa el título de tu evento:');
    const type = prompt('Ingresa el tipo de evento (exam, task, class):'); // Solicita el tipo de evento
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Limpia la selección en el calendario

    if (title && type) {
      // Crear un nuevo evento en el formato esperado por el backend
      const newEvent = {
        id: createEventId(),
        title,
        startDateTime: selectInfo.startStr, // Usar `startDateTime` para el backend
        endDateTime: selectInfo.endStr,    // Usar `endDateTime` para el backend
        allDay: selectInfo.allDay,
        locationType: selectInfo.view.type// Asignar el tipo de evento
      };

      // Crear evento en el backend y añadirlo al calendario
      this.calendarService.createCalendarEvent(newEvent).subscribe({
        next: (savedEvent) => {
          calendarApi.addEvent({
            id: savedEvent.id.toString(),
            title: savedEvent.title,
            start: savedEvent.startDateTime, // Adaptar para FullCalendar
            end: savedEvent.endDateTime,     // Adaptar para FullCalendar
            allDay: savedEvent.allDay,
            color: savedEvent.locationType
          });
          console.log('Evento creado:', savedEvent);
        },
        error: (err) => {
          console.error('Error al crear el evento:', err);
        },
      });
    }
  }

  /**
   * Maneja el clic en un evento para eliminarlo.
   * @param clickInfo Información del clic en el evento.
   */
  private handleEventClick(clickInfo: EventClickArg): void {
    const confirmDelete = confirm(
      `¿Estás seguro de que quieres eliminar el evento '${clickInfo.event.title}'?`
    );

    if (confirmDelete) {
      const eventId = clickInfo.event.id;

      // Eliminar evento del backend y del calendario
      this.calendarService.deleteCalendarEvent(Number(eventId)).subscribe({
        next: () => {
          clickInfo.event.remove();
          console.log('Evento eliminado:', eventId);
        },
        error: (err) => {
          console.error('Error al eliminar el evento:', err);
        },
      });
    }
  }

  /**
   * Maneja los cambios en los eventos actuales.
   * @param events Lista actual de eventos en el calendario.
   */
  private handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
    console.log('Eventos actuales en el calendario:', this.currentEvents);
    this.changeDetector.detectChanges();
  }
}
