import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  
  private baseUrl: string = "httpClient://localhost:8080/" // Pfad zum Backend

  constructor(private httpClient: HttpClient) { }

  public addAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.httpClient.post<IAppointment>(this.baseUrl + "addAppointment", appointment);
  }

  public editAppointment(appointment: IAppointment): Observable<IAppointment> {
    return this.httpClient.put<IAppointment>(this.baseUrl + "updateAppointment", appointment);
  }

  public getAppointment(id: number): Observable<IAppointment> {
    let httpParams = new HttpParams().set("AppointmentId", id);
    return this.httpClient.get<IAppointment>(this.baseUrl + "findAppointmentById", {params: httpParams});
  }

  public deleteAppointment(id: number): Observable<IAppointment> {
    let httpParams = new HttpParams().set("AppointmentId", id);
    return this.httpClient.delete<IAppointment>(this.baseUrl + "deleteAppointment", {params: httpParams});
  }

  public getAllAppointmentsByUserId(userId: number): Observable<IAppointment[]> {
    let httpParams = new HttpParams().set("UserId", userId);
    return this.httpClient.get<IAppointment[]>(this.baseUrl + "getAllAppointments", {params: httpParams});
  }
}

