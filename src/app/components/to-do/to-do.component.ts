import { Component } from '@angular/core';
import { IToDo } from '../../models/to-do';
import { CommonModule, DatePipe } from '@angular/common';
import { AddToDoComponent } from './add-to-do/add-to-do.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToDoService } from '../../services/to-do.service';
import { EditToDoComponent } from './edit-to-do/edit-to-do.component';
import { DeleteToDoComponent } from './delete-to-do/delete-to-do.component';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [DatePipe, CommonModule, AddToDoComponent, EditToDoComponent, DeleteToDoComponent, MatDialogModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent {
  // Liste für die im Select angezeigten Status erstellen.
  protected statusList: string[] = ["ALLE", "OFFEN", "GESCHLOSSEN"];
  // Den aktiven Status auf den ersten Index der Status Liste ("ALLE") setzen.
  protected activeStatus: string = this.statusList[0];

  protected showModal: boolean = false;
  
  protected _user: Observable<IUser> = new Observable<IUser>;
  protected user?: IUser;

  constructor(
    private todoService: ToDoService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    let userId = localStorage.getItem("userId");
    if (userId) this._user = this.userService.getIUser(parseInt(userId));
    this._user.subscribe(res => {
      this.user = res;
      this.getAllTodos();
    });
  }

  openAddTodoModal() {
    const dialogRef = this.dialog.open(AddToDoComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTodos();
    });
  }

  openEditTodoModal(todo: IToDo) {
    const dialogRef = this.dialog.open(EditToDoComponent, {
      data: todo,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTodos();
    });
  }

  openDeleteTodoModal(todo: IToDo) {
    const dialogRef = this.dialog.open(DeleteToDoComponent, {
      data: todo,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTodos();
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

  // Liste für die vom Backend erhaltenen ToDo Daten erstellen.
  protected todoData: IToDo[] = [];

  protected getAllTodos() {
    if (this.user && this.user.id)
    this.todoService.getAllTodosByUserId(this.user.id).subscribe(res => {
      this.todoData = res;
      this.displayedTodoData = this.todoData;
    });
  }

  // Die angezeigten ToDo Daten auf die vom Backend gesendeten ToDo Daten setzen.
  protected displayedTodoData: IToDo[] = [];

  protected updateStatus(event: any) {
    // Den Wert aus dem Select wert holen.
    this.activeStatus = event.target.value;
    if (this.activeStatus === "OFFEN") {
      // Die angezeigten ToDo Daten so bearbeiten, dass nur ToDo's mit dem Status "OFFEN" angezeigt werden.
      this.displayedTodoData = this.todoData.filter(data => !data.status);
    } else if (this.activeStatus === "GESCHLOSSEN") {
      // Die angezeigten ToDo Daten so bearbeiten, dass nur ToDo's mit dem Status "GESCHLOSSEN" angezeigt werden.
      this.displayedTodoData = this.todoData.filter(data => data.status); 
    } else {
      // Die angezeigten ToDo Daten wieder auf die ungefiltert setzen. 
      this.displayedTodoData = this.todoData.slice();
    }
  }

  protected updateSearch(event: any) {
    // Die angezeigten ToDo Daten so bearbeiten, dass nur ToDo's mit dem gesuchten Keyword angezeigt werden.
    this.displayedTodoData = this.todoData.filter(data => data.title.includes(event.target.value));
  }

}