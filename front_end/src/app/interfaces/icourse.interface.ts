export interface ICourse {
    id: number;
    name: string;
    price: number;
    category_id: number;
    modality_id: number;
    startDate: Date;
    endDate: Date;
}