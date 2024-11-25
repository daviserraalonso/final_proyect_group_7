import { IUserDetails } from "./iUserDetails";

export interface IUser {
    id: number;
    name: string;
    email: string;
    details: IUserDetails;
  }