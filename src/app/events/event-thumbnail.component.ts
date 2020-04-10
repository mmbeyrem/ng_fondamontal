import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "eventthumbnail",
  template: `
    <div
      [routerLink]="['/events', event.id]"
      class="well hoverwell thumbnail"
      *ngIf="event"
    >
      <h2>{{ event.name | uppercase }}</h2>
      <div>date:{{ event.date }}</div>
      <div [ngClass]="GetTimeClass()" [ngSwitch]="event.time">
        time:{{ event.time }}
        <span *ngSwitchCase="'8:00 am'"> (Early Start) </span>
        <span *ngSwitchCase="'10:00 am'">(Late Start) </span>
        <span *ngSwitchDefault> (Normal Start) </span>
      </div>
      <div>price:{{ event.price | currency: "USD" }}</div>
      <!-- <img [src]="event.image" /> -->
      <div [hidden]="!event.location">
        <span>Location : {{ event.location?.address }} </span>
        <span class="pad-left"
          >{{ event.location?.city }},{{ event.location?.country }}
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .pad-left {
        margin-left: 10px;
      }
      .well div {
        color: #bbb;
      }
      .thumbnail {
        min-height: 210px;
      }
    `,
  ],
})
export class EventThumbnailComponenet {
  @Input() event: any;
  GetTimeClass() {
    if (this.event.time == "8:00 am") return "alert alert-info";
  }
}
