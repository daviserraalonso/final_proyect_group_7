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
import { lastValueFrom } from 'rxjs';
import { ICourseEvent } from '../../../../interfaces/iCourseEvent';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
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
    events: [],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  currentEvents: EventApi[] = [];


  constructor(
    private calendarService: CalendarService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  private async loadEvents(): Promise<void> {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) throw new Error('Usuario no encontrado en localStorage.');

      const user = JSON.parse(userString);
      const professorId = user.id;
      if (!professorId) throw new Error('ID del usuario no encontrado.');

      const response = await lastValueFrom(this.calendarService.getEventsByProfessorId(professorId));


      if (Array.isArray(response)) {
        // Limpia los eventos previos para evitar duplicados
        const events = response.map((event) => ({
          id: event.id.toString(),
          title: event.title,
          description: event.description || '',
          start: new Date(event.startDateTime).toISOString(),
          end: event.endDateTime ? new Date(event.endDateTime).toISOString() : undefined,
          allDay: event.allDay || false,
          color: this.getEventColor(event.locationType || 'default'),
          extendedProps: {
            description: event.description || '',
            locationType: event.locationType || null, // Valor predeterminado
            courseId: event.courseId || null,
            subjectId: event.subjectId || null, // Incluye subjectId si está disponible
          },
        }));

        this.calendarOptions = { ...this.calendarOptions, events }; // Actualiza eventos de manera reactiva
      } else {
        console.error('Error: La respuesta no es un array.');
      }
    } catch (err) {
      console.error('Error al cargar eventos:', err);
    }
  }


  private getEventColor(locationType: string): string {
    switch (locationType) {
      case 'Presential':
        return 'red';
      case 'Online':
        return 'green';
      default:
        return 'orange';
    }
  }

  private handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar;

    if (!this.canEditEvents()) return;

    calendarApi.unselect();

    const newEvent: ICourseEvent = {
      id: 0,
      title: 'Nuevo Evento',
      description: '',
      startDateTime: selectInfo.startStr,
      endDateTime: selectInfo.endStr,
      allDay: selectInfo.allDay,
      locationType: '',
      isRead: false,
      courseId: 0,
      subjectId: 0,
      professorId: 0,
    };

    this.openEventEditDialog(newEvent);
  }


  private handleEventClick(clickInfo: EventClickArg): void {
    // Recupera y parsea el usuario desde localStorage
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const event: ICourseEvent = {
      id: Number(clickInfo.event.id),
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps['description'] || '',
      startDateTime: clickInfo.event.start?.toISOString() || '',
      endDateTime: clickInfo.event.end?.toISOString() || '',
      allDay: clickInfo.event.allDay,
      locationType: clickInfo.event.extendedProps['locationType'] || null,
      courseId: clickInfo.event.extendedProps['courseId'] || 0,
      subjectId: clickInfo.event.extendedProps['subjectId'] || 0,
      professorId: user?.id || 0, // Usa el ID del profesor, o 0 si no está disponible
      isRead: clickInfo.event.extendedProps['isRead'] || false,
    };

    if (!this.canEditEvents()) {
      this.openEventDetailsDialog(event);
    } else {
      this.openEventEditDialog(event);
    }
  }




  private openEventEditDialog(event: ICourseEvent): void {
    // Validar y corregir locationType si es 'default'
    if (event.locationType === 'default') {
      event.locationType = 'Presential'; // Valor predeterminado
    }

    const dialogRef = this.dialog.open(CalendarEditEventComponent, {
      width: '800px',
      height: '600px',
      data: event,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Si el diálogo devuelve algo, solo recarga los eventos.
        this.loadEvents();
      }
    });

  }


  private openEventDetailsDialog(event: ICourseEvent): void {
    this.dialog.open(CalendarEventComponent, {
      width: '800px',
      data: {
        id: event.id,
        title: event.title,
        description: event.description,
        start: event.startDateTime,
        end: event.endDateTime,
      },
    });
  }

  private handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  canEditEvents(): boolean {
    const userRole = Number(localStorage.getItem('role'));
    return userRole === 1 || userRole === 2;
  }
}
