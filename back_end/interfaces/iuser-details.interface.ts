export interface IuserDetails {
    id: number;
    userId: number;
    phone?: string;
    description?: string;
    img_url?: string;
    createdAt: Date;
    updatedAt: Date;
}