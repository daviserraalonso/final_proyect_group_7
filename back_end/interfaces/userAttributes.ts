export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
    roleId: number;
    phone?: string;
    isValidated?: boolean;
    lat?: number;
    lng?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;