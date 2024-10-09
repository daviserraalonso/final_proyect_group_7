import { Imodality } from "./imodality.interface";

export interface ICourse {
    id: number;
    name: string;
    idProfessor: number;
    price: number;
    category: string; // Example: 'mathematics', 'languages', etc.
    modality: Imodality;
    startDate: string;
    endDate: string;
}