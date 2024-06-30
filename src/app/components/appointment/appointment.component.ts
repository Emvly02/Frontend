import { Component } from '@angular/core';
import { IAppointment } from '../../models/appointment';
import { CommonModule, DatePipe } from '@angular/common';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { DeleteAppointmentComponent } from './delete-appointment/delete-appointment.component';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [DatePipe, CommonModule, AddAppointmentComponent, EditAppointmentComponent, DeleteAppointmentComponent, MatDialogModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {
  // Liste für die im Select angezeigten Status erstellen.
  protected statusList: string[] = ["ALLE", "OFFEN", "GESCHLOSSEN"];
  // Den aktiven Status auf den ersten Index der Status Liste ("ALLE") setzen.
  protected activeStatus: string = this.statusList[0];

  protected showModal: boolean = false;
  
  protected _user: Observable<IUser> = new Observable<IUser>;
  protected user?: IUser;

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    let userId = localStorage.getItem("userId");
    if (userId) this._user = this.userService.getIUser(parseInt(userId));
    this._user.subscribe(res => {
      this.user = res;
      this.getAllAppointments();
    });
  }

  openAddAppointmentModal() {
    const dialogRef = this.dialog.open(AddAppointmentComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAppointments();
    });
  }

  openEditAppointmentModal(appointment: IAppointment) {
    const dialogRef = this.dialog.open(EditAppointmentComponent, {
      data: appointment,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAppointments();
    });
  }

  openDeleteAppointmentModal(appointment: IAppointment) {
    const dialogRef = this.dialog.open(DeleteAppointmentComponent, {
      data: appointment,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAppointments();
    });
  }

  // Liste für die in der Tabelle angezeigten Spalten erstellen.
  protected columns = [
    { key: 'title', label: 'Aufgabe'},
    { key: 'user', label: 'User'},
    { key: 'date', label: 'Deadline'},
    { key: 'status', label: 'Status'},
    { key: 'actions', label: 'Aktion'}
  ];

  // Liste für die vom Backend erhaltenen Appointment Daten erstellen.
  protected appointmentData: IAppointment[] = [];

  protected getAllAppointments() {
    if (this.user && this.user.id)
    this.appointmentService.getAllAppointmentsByUserId(this.user.id).subscribe(res => {
      this.appointmentData = res;
      this.displayedAppointmentData = this.appointmentData;
    });
  }

  // Die angezeigten Appointment Daten auf die vom Backend gesendeten Appointment Daten setzen.
  protected displayedAppointmentData: IAppointment[] = [];

  protected updateStatus(event: any) {
    // Den Wert aus dem Select wert holen.
    this.activeStatus = event.target.value;
    if (this.activeStatus === "OFFEN") {
      // Die angezeigten Appointment Daten so bearbeiten, dass nur Appointment's mit dem Status "OFFEN" angezeigt werden.
      this.displayedAppointmentData = this.appointmentData.filter(data => !data.status);
    } else if (this.activeStatus === "GESCHLOSSEN") {
      // Die angezeigten Appointment Daten so bearbeiten, dass nur Appointment's mit dem Status "GESCHLOSSEN" angezeigt werden.
      this.displayedAppointmentData = this.appointmentData.filter(data => data.status); 
    } else {
      // Die angezeigten Appointment Daten wieder auf die ungefiltert setzen. 
      this.displayedAppointmentData = this.appointmentData.slice();
    }
  }

  protected updateSearch(event: any) {
    // Die angezeigten Appointment Daten so bearbeiten, dass nur Appointment's mit dem gesuchten Keyword angezeigt werden.
    this.displayedAppointmentData = this.appointmentData.filter(data => data.title.includes(event.target.value));
  }

}