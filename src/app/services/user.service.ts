import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:8080/" // Pfad zum Backend

  constructor(private httpClient: HttpClient) { }

  // sendet Anfrage an Backend, um zu überprüfen, ob der IUser eingeloggt werden kann
  public login(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.baseUrl + "login", user);
  }

  public register(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.baseUrl + "registrate", user);
  }
  public editIUser(user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.baseUrl + "updateIUser", user);
  }

  public getIUser(id: number): Observable<IUser> {
    let httpParams = new HttpParams().set("IUserId", id);
    return this.httpClient.get<IUser>(this.baseUrl + "findIUserById", {params: httpParams});
  }

  public deleteIUser(id: number): Observable<IUser> {
    let httpParams = new HttpParams().set("IUserId", id);
    return this.httpClient.delete<IUser>(this.baseUrl + "deleteIUser", {params: httpParams});
  }

  public getAllIUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.baseUrl + "getAllIUsers");
  }
}
