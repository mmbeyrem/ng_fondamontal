import { Component, Injectable } from "@angular/core";
import { Router, CanDeactivate } from "@angular/router";
import { EventService } from "./event.service";

@Component({
  templateUrl: "create-event.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e2c3c5;
      }
      .error ::-webkit-inout-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :ms-inout-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateEventComponent {
  /**
   *
   */
  NewEvent;
  constructor(private router: Router, private eventService: EventService) {}
  cancel() {
    this.router.navigateByUrl("/events");
  }
  saveEvent(newEvent) {
    console.log(newEvent);
    this.eventService.saveEvent(newEvent).subscribe(() => {
      this.IsDirty = false;
      this.router.navigateByUrl("/events");
    });
  }
  IsDirty: boolean = true;
}

@Injectable()
export class CreateEventGuard implements CanDeactivate<CreateEventComponent> {
  canDeactivate(
    component: CreateEventComponent,
    currentRoute: import("@angular/router").ActivatedRouteSnapshot,
    currentState: import("@angular/router").RouterStateSnapshot,
    nextState?: import("@angular/router").RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    console.log(component.IsDirty);
    return !component.IsDirty;
  }
}
