import { IAppointment } from "./appointment";
import { IToDo } from "./to-do";

export interface IUser {
    id: number;
    firstname: string;
    lastname: string; 
    password: string;
    username: string;
    todos: IToDo[]; 
    appointments: IAppointment[];
}