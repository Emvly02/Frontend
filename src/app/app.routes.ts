import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import { AppointmentComponent } from './components/appointment/appointment.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'}, // wenn keine expliziete URL angegeben wurde
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'to-do', component: ToDoComponent},
    { path: 'appointment', component: AppointmentComponent}
];


