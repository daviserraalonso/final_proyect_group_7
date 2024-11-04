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

export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    phone?: string;
    isValidated?: number;
    lat?: number;
    lng?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;