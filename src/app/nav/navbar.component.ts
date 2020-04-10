import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { ISession } from "../events/event.model";
import { EventService } from "../events/event.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 1200px) {
        #searchForm {
        }
      }
      li > a.active {
        color: #f97924;
      }
    `,
  ],
})
export class NavBarComponent implements OnInit, OnChanges {
  searchTerm: string = "";
  foundedSessions: ISession[] = [];
  constructor(
    private authService: AuthService,
    private sessionService: EventService
  ) {}
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("this.IsLogged" + this.IsLogged);
    this.IsLogged = this.authService.IsAuthenticated();
    if (this.IsLogged) this.userName = this.authService.currentUser.userName;
    console.log("this.IsLogged" + this.IsLogged);
  }
  userName: string;
  IsLogged: boolean = false;
  ngOnInit() {}
  searchSession(searchTerm): void {
    this.sessionService
      .FindSessions(searchTerm)
      .subscribe((sessions) => (this.foundedSessions = sessions));
  }
}
