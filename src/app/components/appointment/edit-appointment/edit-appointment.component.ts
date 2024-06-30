import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IUser } from '../../../models/user';
import { IAppointment } from '../../../models/appointment';
import { UserService } from '../../../services/user.service';
import { AppointmentService } from '../../../services/appointment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.scss'
})
export class EditAppointmentComponent {
  // editAppointment als Output für das Appointment-Component festlegen.
  @Output() editAppointment: EventEmitter<IAppointment> = new EventEmitter();
  // Appointment-Form für das hinzufügen von Appointment's erstellen.
  protected appointmentForm: FormGroup;
  // Liste für die im Select angezeigten Benutzer/Partner erstellen.
  protected userList: IUser[] = [];
  
  protected selectedUsers: IUser[] = [];

  protected _user: Observable<IUser> = new Observable<IUser>;
  protected user?: IUser;

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public appointment: IAppointment
  ) {
    // Appointment-Form mit attributen befüllen.
    this.appointmentForm = this.formBuilder.group({
      id: appointment.id,
      title: new FormControl(appointment.title, Validators.required),
      status: new FormControl(appointment.status, Validators.required),
      ddate: new FormControl(appointment.date, Validators.required),
      description: new FormControl(appointment.description),
      users: new FormControl(appointment.users, Validators.required)
    });   
    this.selectedUsers = appointment.users

    let userId = localStorage.getItem("userId");
    if (userId) this._user = this.userService.getIUser(parseInt(userId));
    this._user.subscribe(res => {
      this.user = res;
    });

    // Benutzer Liste mit Benutzern aus dem Backend befüllen.
    this.userService.getAllIUsers().subscribe(res => {
      this.userList = res;
    });
  }
  
  submitAppointment() {
    // Prüfen ob die Appointment-Form valide ist (anhand der in dem contructor festgelegten Validator methoden)
    if (this.appointmentForm.valid) {
      // Die von Nutzer eingebenen Daten an das Backend übersenden.
      this.appointmentService.editAppointment(this.appointmentForm.value).subscribe(res => {
        // Die von Nutzer eingebenen Daten an das Appointment-Component übersenden.
        this.editAppointment.emit(this.appointmentForm.value);
        // Dialog wieder schließen.
        this.dialogRef.close();
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
