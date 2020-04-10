import { Component, OnInit, Inject } from "@angular/core";
import { Notify, INotify } from "../common/notification.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "events-list",
  templateUrl: "event-list.component.html",
})
export class EventListComponenet implements OnInit {
  events: any;
  constructor(
    @Inject(Notify) private notifier: INotify,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.events = this.route.snapshot.data["events"];
  }
  handleNailClick(data) {
    this.notifier.success(data);
  }
}
