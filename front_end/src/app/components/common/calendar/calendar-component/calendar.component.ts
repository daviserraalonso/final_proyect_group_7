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
import { EventType } from '@angular/router';

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
    const userString = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    console.log('User from localStorage:', userString);
    console.log('Role from localStorage:', role);

    this.loadEvents();
  }


  private async loadEvents(): Promise<void> {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) throw new Error('Usuario no encontrado en localStorage.');

      const user = JSON.parse(userString);
      const roleId = Number(localStorage.getItem('role'));
      const userId = user.id;

      let events: any[] = [];

      if (roleId === 1) {
        events = await lastValueFrom(this.calendarService.getCalendarEvents());
      } else if (roleId === 2) {
        events = await lastValueFrom(this.calendarService.getEventsByProfessorId(userId));
      } else if (roleId === 3) {
        events = await lastValueFrom(this.calendarService.getEventsByStudentId(userId));
      }


      if (Array.isArray(events)) {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: events.map((event) => ({
            id: event.id.toString(),
            title: event.title,
            description: event.description || '',
            start: new Date(event.startDateTime).toISOString(),
            end: event.endDateTime ? new Date(event.endDateTime).toISOString() : undefined,
            allDay: event.allDay || false,
            color: this.getEventColor(event.eventType || 'default'),
            extendedProps: {
              description: event.description || '',
              locationType: event.locationType || null,
              locationId: event.locationId || null,
              onlineLink: event.onlineLink || '',
              courseId: event.courseId || null,
              subjectId: event.subjectId || null,
              eventType: event.eventType,
            },
          })),
        };

      } else {
        console.error('Error: La respuesta no es un array.');
      }
    } catch (err) {
      console.error('Error al cargar eventos:', err);
    }
  }


  private getEventColor(eventType: string): string {
    switch (eventType) {
      case 'task':
        return 'red';
      case 'class':
        return 'green';
      default:
        return 'orange';
    }
  }

  private handleDateSelect(selectInfo: DateSelectArg): void {
    const roleId = Number(localStorage.getItem('role'));

    if (roleId === 3) {
      // No permitir seleccionar fechas si el rol es 3
      return;
    }

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    const newEvent: ICourseEvent = {
      id: 0,
      title: '',
      description: '',
      startDateTime: selectInfo.startStr,
      endDateTime: selectInfo.endStr,
      allDay: selectInfo.allDay,
      locationType: '',
      isRead: false,
      courseId: 0,
      subjectId: 0,
      professorId: 0,
      eventType: 'class',
    };

    this.openEventEditDialog(newEvent, true);
  }


  private handleEventClick(clickInfo: EventClickArg): void {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const roleId = Number(localStorage.getItem('role'));

    const event: ICourseEvent = {
      id: Number(clickInfo.event.id),
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps['description'] || '',
      startDateTime: clickInfo.event.start?.toISOString() || '',
      endDateTime: clickInfo.event.end?.toISOString() || '',
      allDay: clickInfo.event.allDay,
      locationType: clickInfo.event.extendedProps['locationType'] || null,
      locationId: clickInfo.event.extendedProps['locationId'] || null,
      onlineLink: clickInfo.event.extendedProps['onlineLink'] || '',
      courseId: clickInfo.event.extendedProps['courseId'] || 0,
      subjectId: clickInfo.event.extendedProps['subjectId'] || 0,
      professorId: user?.id || 0,
      isRead: clickInfo.event.extendedProps['isRead'] || false,
      eventType: clickInfo.event.extendedProps['eventType'] || null,
    };

    if (roleId === 3) {
      this.openEventDetailsDialog(event);
    } else {
      this.openEventEditDialog(event, false);
    }
  }


  private openEventEditDialog(event: ICourseEvent, isNew: boolean): void {
    const dialogRef = this.dialog.open(CalendarEditEventComponent, {
      width: '900px',
      height: '700px',
      data: { event, isNew }, //Pasamos el evento y la flag
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadEvents();
      }
    });
  }

  private openEventDetailsDialog(event: ICourseEvent): void {
    this.dialog.open(CalendarEventComponent, {
      width: '1000px',
      data: { event }, //Pasar el evento completo
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
