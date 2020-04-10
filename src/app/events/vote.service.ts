import { Injectable } from "@angular/core";
import { ISession } from "./event.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class VoteService {
  constructor(private http: HttpClient) {}
  userHasVoted(session: ISession, userName: string) {
    return session.voters.find((v) => v == userName);
  }
  Vote(eventId: number, session: ISession, voterName: string): void {
    session.voters.push(voterName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http
      .post(
        url,
        {},
        { headers: new HttpHeaders({ "Content-Type": "application/json" }) }
      )
      .pipe(catchError(this.HandleError("Vote")))
      .subscribe(); //in order to run whatever
  }
  Remove(eventId: number, session: ISession, username: string) {
    session.voters.splice(
      session.voters.findIndex((v) => v == username),
      1
    );
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${username}`;
    this.http
      .delete(url)
      .pipe(catchError(this.HandleError("Vote")))
      .subscribe(); //in order to run whatever
  }

  private HandleError<T>(operation = "operation", result?: T) {
    return (erro: any): Observable<T> => {
      console.log(operation);
      return of(result as T);
    };
  }
}
