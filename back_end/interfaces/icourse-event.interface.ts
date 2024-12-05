export interface IcourseEvent {
    id: number;
    courseId: number;
    subjectId?: number;
    proffesorId?: number;
    eventType: 'class' | 'task';
    title: string;
    description?: string;
    startDateTime: Date;
    endDateTime: Date;
    locationType: 'physical' | 'online';
    locationId?: number;
    onlineLink?: string;
    isRead?: boolean;
}