import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentService } from '../../../services/appointment.service';
import { IAppointment } from '../../../models/appointment';

@Component({
  selector: 'app-delete-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './delete-appointment.component.html',
  styleUrl: './delete-appointment.component.scss'
})
export class DeleteAppointmentComponent {
  @Output() deleteAppointment: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DeleteAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public appointment: IAppointment,
    private appointmentService: AppointmentService
  ) { }

  protected confirmDelete() {
    // Dem Backend den Befehl geben die ausgewählte Aufagbe zu löschen.
    console.log("delete: ", this.appointment);
    if (this.appointment.id) this.appointmentService.deleteAppointment(this.appointment.id).subscribe(res => {
      this.deleteAppointment.emit();
      this.cancel();
    });
  }
  
  protected cancel() {
    // Den Dialog wieder schließen/Die Aktion abbrechen.
    this.dialogRef.close();
  }

}
