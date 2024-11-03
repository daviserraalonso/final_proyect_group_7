export interface Iuser {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    isValidated?: boolean;
    createdAt: Date;
    updatedAt: Date;
}