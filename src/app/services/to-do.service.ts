import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IToDo } from '../models/to-do';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  
  private baseUrl: string = "httpClient://localhost:8080/" // Pfad zum Backend

  constructor(private httpClient: HttpClient) { }

  public addTodo(todo: IToDo): Observable<IToDo> {
    return this.httpClient.post<IToDo>(this.baseUrl + "addTodo", todo);
  }

  public editTodo(todo: IToDo): Observable<IToDo> {
    return this.httpClient.put<IToDo>(this.baseUrl + "updateTodo", todo);
  }

  public getTodo(id: number): Observable<IToDo> {
    let httpParams = new HttpParams().set("TodoId", id);
    return this.httpClient.get<IToDo>(this.baseUrl + "findTodoById", {params: httpParams});
  }

  public deleteTodo(id: number): Observable<IToDo> {
    let httpParams = new HttpParams().set("TodoId", id);
    return this.httpClient.delete<IToDo>(this.baseUrl + "deleteTodo", {params: httpParams});
  }

  public getAllTodosByUserId(userId: number): Observable<IToDo[]> {
    let httpParams = new HttpParams().set("UserId", userId);
    return this.httpClient.get<IToDo[]>(this.baseUrl + "getAllTodos", {params: httpParams});
  }
}
