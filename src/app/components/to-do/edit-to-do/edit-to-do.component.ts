import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IUser } from '../../../models/user';
import { IToDo } from '../../../models/to-do';
import { UserService } from '../../../services/user.service';
import { ToDoService } from '../../../services/to-do.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-to-do',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-to-do.component.html',
  styleUrl: './edit-to-do.component.scss'
})
export class EditToDoComponent {
  // editTodo als Output für das ToDo-Component festlegen.
  @Output() editTodo: EventEmitter<IToDo> = new EventEmitter();
  // ToDo-Form für das hinzufügen von ToDo's erstellen.
  protected todoForm: FormGroup;
  // Liste für die im Select angezeigten Benutzer/Partner erstellen.
  protected userList: IUser[] = [];
  
  protected selectedUsers: IUser[] = [];

  protected _user: Observable<IUser> = new Observable<IUser>;
  protected user?: IUser;

  constructor(
    private todoService: ToDoService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditToDoComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: IToDo
  ) {
    // ToDo-Form mit attributen befüllen.
    this.todoForm = this.formBuilder.group({
      id: todo.id,
      title: new FormControl(todo.title, Validators.required),
      status: new FormControl(todo.status, Validators.required),
      date: new FormControl(todo.date, Validators.required),
      description: new FormControl(todo.description),
      users: new FormControl(todo.users, Validators.required)
    });   
    this.selectedUsers = todo.users

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
  
  submitTodo() {
    // Prüfen ob die ToDo-Form valide ist (anhand der in dem contructor festgelegten Validator methoden)
    if (this.todoForm.valid) {
      // Die von Nutzer eingebenen Daten an das Backend übersenden.
      this.todoService.editTodo(this.todoForm.value).subscribe(res => {
        // Die von Nutzer eingebenen Daten an das ToDo-Component übersenden.
        this.editTodo.emit(this.todoForm.value);
        // Dialog wieder schließen.
        this.dialogRef.close();
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
