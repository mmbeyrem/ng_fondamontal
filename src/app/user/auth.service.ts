import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class AuthService {
  logout() {
    this.currentUser = undefined;
    return this.http.post(
      "/api/user/logout",
      {},
      { headers: new HttpHeaders({ "Content-Type": "application/json," }) }
    );
  }
  currentUser: IUser;
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<IUser | boolean> {
    return (
      this.http
        .post<IUser>(
          "/api/login",
          {
            username,
            password,
          },
          {
            headers: new HttpHeaders({ "Content-Type": "application/json," }),
          }
        ) // we don't subscribe => we don't sk for login but
        //if someone else subscribe the request is called and we can see the result
        .pipe(tap((data) => (this.currentUser = <IUser>data["user"])))
        .pipe(catchError((err) => of(false)))
    );
  }
  UpdateUser(firstname: string, lastname: string) {
    this.currentUser.firstName = firstname;
    this.currentUser.lastName = lastname;
    return this.http.put(
      `/api/users/${this.currentUser.id}`,
      this.currentUser,
      {
        headers: new HttpHeaders({ "Content-type": "application/json" }),
      }
    );
  }
  IsAuthenticated(): boolean {
    return !!this.currentUser;
  }
  checkServerAutheticationStatus() {
    this.http
      .get("/api/currentIdentity")
      .pipe(
        tap(
          (data) =>
            (this.currentUser =
              data instanceof Object ? <IUser>data : undefined)
        )
      )
      .subscribe();
  }
}
