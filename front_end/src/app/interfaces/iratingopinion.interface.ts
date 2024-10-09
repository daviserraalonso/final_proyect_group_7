export interface Iratingopinion {
    id: number;
    idProfessor: number;
    idStudent: number;
    idCourse: number;
    score: number;
    opinion?: string;
    ratingDate: string;
}
