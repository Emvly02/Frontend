import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { ToDoService } from '../../../services/to-do.service';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { IToDo } from '../../../models/to-do';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-to-do',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'de-DE'}],
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.scss']
})
export class AddToDoComponent {
  @Output() addTodo: EventEmitter<IToDo> = new EventEmitter();
  protected todoForm: FormGroup;
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
    private todoService: ToDoService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddToDoComponent>
  ) {
    this.todoForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      status: new FormControl(false, Validators.required),
      dueDate: new FormControl(new Date(), Validators.required),
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

  submitTodo() {
    if (this.todoForm.valid) {
      this.todoService.addTodo(this.todoForm.value).subscribe(res => {
        this.addTodo.emit(this.todoForm.value);
        console.log(this.todoForm.value);
        this.dialogRef.close();
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
