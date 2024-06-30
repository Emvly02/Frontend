import { Component } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { IToDo } from '../../models/to-do';
import { CommonModule, DatePipe } from '@angular/common';
import { IAppointment } from '../../models/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  protected statusList: string[] = ["ALLE", "OFFEN", "GESCHLOSSEN"];
  protected _user: Observable<IUser> = new Observable<IUser>;
  protected user?: IUser;

  constructor(
    private todoService: ToDoService,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {

    let userId = localStorage.getItem("userId");
    if (userId) this._user = this.userService.getIUser(parseInt(userId));
    this._user.subscribe(res => {
      this.user = res;
      this.getAllTodos();
      this.getAllAppointments();
    });
  }

  protected columnsTodo = [
    { key: 'title', label: 'Aufgabe' },
    { key: 'date', label: 'Deadline' },
    { key: 'status', label: 'Status' },
  ];

  protected columnsAppointment = [
    { key: 'title', label: 'Termin' },
    { key: 'date', label: 'Datum' },
    { key: 'status', label: 'Status' },
  ];

  protected displayedTodoData: IToDo[] = [];
  protected displayAppointmentData: IAppointment[] = [];

  protected getAllTodos() {
    if (this.user && this.user.id)
      this.todoService.getAllTodosByUserId(this.user.id).subscribe(res => {
        const currentMonth = new Date().getMonth(); // Aktueller Monat (0-basiert, also Januar ist 0)
        const currentYear = new Date().getFullYear(); // Aktuelles Jahr

        this.displayedTodoData = res.filter(todo => {
          const todoDate = new Date(todo.date); // Annahme: `creationDate` ist das Feld mit dem Erstellungsdatum
          return todoDate.getMonth() === currentMonth && todoDate.getFullYear() === currentYear;
        });
      });
  }

  protected getAllAppointments() {
    if (this.user && this.user.id)
      this.appointmentService.getAllAppointmentsByUserId(this.user.id).subscribe(res => {
        this.displayAppointmentData = res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });
    this.displayAppointmentData = [
      {
        id: 1,
        title: "Projektname...",
        description: "Beschreibung...",
        date: new Date(),
        status: false,
        users: []
      },
      {
        id: 1,
        title: "Projektname...",
        description: "Beschreibung...",
        date: new Date(),
        status: false,
        users: []
      },

    ]
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
