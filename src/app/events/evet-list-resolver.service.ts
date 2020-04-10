import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { EventService } from "./event.service";

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.eventService.getEvents();
  }
}

@Injectable()
export class EventDetailstResolver implements Resolve<any> {
  constructor(private eventService: EventService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.eventService.getEvent(+route.params["id"]);
  }
}
