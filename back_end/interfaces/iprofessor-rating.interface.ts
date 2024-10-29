export interface IprofessorRating {
    id: number;
    professorId: number;
    studentId: number;
    courseId: number;
    rating?: number;
    comments?: string;
    ratingDate: Date;
}