export interface IcourseEvent {
    id: number;
    idCourse: number;
    idSubject?: number;
    eventType: 'class' | 'task';
    title: string;
    description?: string;
    startDateTime: Date;
    endDateTime: Date;
    locationType: 'physical' | 'online';
    locationId?: number;
    onlineLink?: string;
    deadline?: Date;
}
