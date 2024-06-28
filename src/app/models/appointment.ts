import { IUser } from "./user";

export interface IAppointment {
    id: number;
    title: string;
    description?: string; // description darf null sein
    date: Date;
    status: boolean;
    users: IUser[]; 
}