import { Routes } from "@angular/router";
import { EventListComponenet } from "./app/events/event-list.component";
import { EventDetailsComponent } from "./app/events/event-details/event-details.componenet";
import {
  CreateEventComponent,
  CreateEventGuard,
} from "./app/events/create-event.component";
import { Error404Component } from "./app/errors/404.component";
import {
  EventListResolver,
  EventDetailstResolver,
} from "./app/events/evet-list-resolver.service";
import { CreateSessionComponent } from "./app/events/event-details/create-session/create-session.component";

export const appRoutes: Routes = [
  {
    path: "events/new",
    component: CreateEventComponent,
    canDeactivate: [CreateEventGuard],
  },
  {
    path: "events",
    component: EventListComponenet,
    resolve: { events: EventListResolver },
  },
  {
    path: "events/:id",
    component: EventDetailsComponent,
    resolve: { eventDetails: EventDetailstResolver },
  },
  {
    path: "404",
    component: Error404Component,
  },
  {
    path: "events/session/new",
    component: CreateSessionComponent,
  },
  { path: "", redirectTo: "events", pathMatch: "full" },
  { path: "user", loadChildren: "./user/user.module#UserModule" },
];
