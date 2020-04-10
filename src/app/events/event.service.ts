import { Injectable, EventEmitter } from "@angular/core";
import { IEvent, ISession } from "./event.model";
import { Subject, Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  FindSessions(searchTerm: string): Observable<ISession[]> {
    return this.http
      .get<ISession[]>("/api/sessions/search?search=" + searchTerm)
      .pipe(catchError(this.HandleError<ISession[]>("FindSessions", [])));
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http
      .get<IEvent>(`/api/events/${id}`)
      .pipe(catchError(this.HandleError<IEvent>(`get event ${id}`)));
  }

  getEvents(): Observable<IEvent[]> {
    return this.http
      .get<IEvent[]>("/api/events")
      .pipe(catchError(this.HandleError<IEvent[]>("getEvents", [])));
  }
  private HandleError<T>(operation = "operation", result?: T) {
    return (erro: any): Observable<T> => {
      console.log(operation);
      return of(result as T);
    };
  }
  private postHeaders: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });
  saveEvent(event: IEvent) {
    return this.http
      .post<IEvent>("/api/events", event, {
        headers: this.postHeaders,
      })
      .pipe(catchError(this.HandleError<IEvent[]>("saveEvent")));
  }
}
