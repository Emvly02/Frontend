import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToDoService } from '../../../services/to-do.service';
import { IToDo } from '../../../models/to-do';

@Component({
  selector: 'app-delete-to-do',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './delete-to-do.component.html',
  styleUrl: './delete-to-do.component.scss'
})
export class DeleteToDoComponent {
  @Output() deleteTodo: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DeleteToDoComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: IToDo,
    private todoService: ToDoService
  ) { }

  protected confirmDelete() {
    // Dem Backend den Befehl geben die ausgewählte Aufagbe zu löschen.
    console.log("delete: ", this.todo);
    if (this.todo.id) this.todoService.deleteTodo(this.todo.id).subscribe(res => {
      this.deleteTodo.emit();
      this.cancel();
    });
  }
  
  protected cancel() {
    // Den Dialog wieder schließen/Die Aktion abbrechen.
    this.dialogRef.close();
  }

}
