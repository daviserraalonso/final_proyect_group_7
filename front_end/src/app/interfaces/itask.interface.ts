export interface Itask {
    id: number;
    idSubject: number;
    idUser: number;
    comments?: string;
    score?: number;
    creationDate: Date;
    deadline?: Date;
}
