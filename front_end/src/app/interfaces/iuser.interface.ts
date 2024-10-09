export interface Iuser {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    phone?: string;
    isValidated?: boolean; // Solo para profesores
    lat?: number;
    lng?: number;
}
