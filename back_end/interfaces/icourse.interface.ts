export interface Icourse {
    id: number;
    name: string;
    price: number;
    category_id: number;
    modality_id: number;
    startDate: Date;
    endDate: Date;
    requirements?: string;
    description?: string;
    professor_id: number;
}