export interface IfinalGrade {
    id: number;
    courseId: number;
    studentId: number;
    finalGrade?: number;
    comments?: string;
    creationDate: Date;
}