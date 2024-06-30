import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { AppointmentService } from '../../../services/appointment.service';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { IAppointment } from '../../../models/appointment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {
  @Output() addAppointment: EventEmitter<IAppointment> = new EventEmitter();
  protected appointmentForm: FormGroup;
  protected userList: IUser[] = [];

  protected selectedUser: IUser[] = [{
    firstname: "o",
    id: 1,
    lastname: "w",
    password: "123",
    todos: [],
    appointments: [],
    username: "o_w"
  }];

  protected _user: Observable<IUser> = new Observable<IUser>;
  protected user?: IUser;

  constructor(
    private appointmentService: AppointmentService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddAppointmentComponent>
  ) {
    this.appointmentForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      status: new FormControl(false, Validators.required),
      date: new FormControl(new Date(), Validators.required),
      description: new FormControl(''),
      users: new FormControl([])
    });

    let userId = localStorage.getItem("userId");
    if (userId) this._user = this.userService.getIUser(parseInt(userId));
    this._user.subscribe(res => {
      this.user = res;
    });

    this.userService.getAllIUsers().subscribe(res => {
      this.userList = res;
    });
  }

  submitAppointment() {
    if (this.appointmentForm.valid) {
      this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(res => {
        this.addAppointment.emit(this.appointmentForm.value);
        console.log(this.appointmentForm.value);
        this.dialogRef.close();
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
