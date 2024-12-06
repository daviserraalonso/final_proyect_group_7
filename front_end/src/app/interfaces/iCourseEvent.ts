export interface ICourseEvent {
    id: string | number;
    title: string;
    startDateTime: string;
    endDateTime: string;
    allDay: boolean;
    locationType: string;
    locationId?: number;
    onlineLink?: string;
    description?: string;
    isRead: boolean;
    courseId: number;
    subjectId: number;
    professorId: number;
}
