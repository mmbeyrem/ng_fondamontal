import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { EventsAppComponent } from "./events-app.component";
import { EventListComponenet } from "./events/event-list.component";
import { EventThumbnailComponenet } from "./events/event-thumbnail.component";
import { NavBarComponent } from "./nav/navbar.component";
import { EventService } from "./events/event.service";
import { Notify } from "./common/notification.service";
import { EventDetailsComponent } from "./events/event-details/event-details.componenet";
import { RouterModule } from "@angular/router";
import { appRoutes } from "../routes";
import {
  CreateEventComponent,
  CreateEventGuard,
} from "./events/create-event.component";
import { Error404Component } from "./errors/404.component";
import {
  EventListResolver,
  EventDetailstResolver,
} from "./events/evet-list-resolver.service";
import { AuthService } from "./user/auth.service";
import { CreateSessionComponent } from "./events/event-details/create-session/create-session.component";
import { SessionListComponent } from "./events/event-details/session-list/session-list.component";
import { CollapsibleWellComponent } from "./common/collapsible-well/collapsible-well.component";
import { DurationPipe } from "./common/duration.pipe";
import { JQ } from "./common/JQuery.service";
import { SimpleModalComponent } from "./common/simple-modal/simple-modal.component";
import { ModalTriggerDirective } from "./common/modal-trigger.directive";
import { UpvoteComponent } from "./events/event-details/upvote/upvote.component";
import { LocationValidatorDirective } from "./events/location-validator.directive";
@NgModule({
  declarations: [
    EventsAppComponent,
    EventListComponenet,
    EventThumbnailComponenet,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidatorDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    EventService,
    {
      provide: Notify,
      useValue: window["toastr"],
    },
    {
      provide: JQ,
      useValue: window["$"],
    },
    CreateEventGuard,
    EventListResolver,
    EventDetailstResolver,
    AuthService,
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}
