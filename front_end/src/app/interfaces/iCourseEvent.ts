export interface ICourseEvent {
    id: string | number;
    title: string;
    startDateTime: string; // Fecha/hora de inicio enviada por el backend
    endDateTime: string;  // Fecha/hora de fin enviada por el backend (opcional)
    allDay: boolean;
    locationType?: string;
    locationId?: number;
    onlineLink?: string;
    description?: string;
    isRead?: boolean;
    courseId?: number;
    subjectId?: number;
    professorId?: number;
    studentId?: number;
}
