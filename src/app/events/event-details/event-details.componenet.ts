import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { ISession, IEvent } from "../event.model";
import { Notify, INotify } from "../../common/notification.service";
import { EventService } from "../event.service";

@Component({
  templateUrl: "event-details.template.html",
  styles: [
    `
      .container : {
        padding-left: 20px;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy: string;
  sortby: string = "";
  filtredSessions: ISession[];
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    @Inject(Notify) private notifier: INotify
  ) {}
  sort(sortby: string) {
    debugger;
    this.sortby = sortby;
    this.filtredSessions = [
      ...this.filtredSessions.sort(
        sortby == "name" ? sortbyNameAes : sortbyVotesAes
      ),
    ];
  }
  filter(filterBy: string): void {
    this.filterBy = filterBy;
    if (filterBy) {
      this.filtredSessions = this.event.sessions.filter(
        (s) => s.level.toLowerCase() == filterBy.toLowerCase()
      );
    } else {
      this.filtredSessions = this.event.sessions;
    }
  }
  ngOnInit(): void {
    this.route.data.forEach((data) => {
      debugger;
      this.event = data["eventDetails"];
      this.filtredSessions = this.event.sessions;
    });

    //this.event = this.activatedRoute.snapshot.data["eventDetails"];
  }
  addSession() {
    this.addMode = true;
  }
  CancelNewSession() {
    this.addMode = false;
    this.notifier.warning(`no new session added`);
  }
  saveNewSession(session: ISession) {
    const maxSessionId = Math.max(...this.event.sessions.map((s) => s.id));
    session.id = maxSessionId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe(() => {
      this.addMode = false;
      this.notifier.success(`session ${session.name} is added succesuflly `);
    });
  }
}
function sortbyNameAes(l: ISession, r: ISession): number {
  if (l.name == r.name) return 0;
  return l.name > r.name ? 1 : -1;
}
function sortbyVotesAes(l: ISession, r: ISession): number {
  return r.voters.length - l.voters.length;
}
