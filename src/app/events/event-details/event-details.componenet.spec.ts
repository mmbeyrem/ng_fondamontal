import { EventDetailsComponent } from "./event-details.componenet";
import { EventService } from "../event.service";
import { componentNeedsResolution } from "@angular/core/src/metadata/resource_loading";
import { ActivatedRoute } from "@angular/router";

describe("EventDetailsComponent", () => {
  let componenet: EventDetailsComponent;
  let mockEventService: EventService;

  describe("filter should", () => {
    it("filter ignore case ", () => {
      componenet = new EventDetailsComponent(
        jasmine.createSpyObj("route", [""]),
        jasmine.createSpyObj("EventService", [""]),
        jasmine.createSpyObj("INotify", [""])
      );
      componenet.event = <any>{
        sessions: [
          <any>{ name: "sesison 1", level: "hard" },
          <any>{ name: "sesison 2", level: "easy" },
          <any>{ name: "sesison 3", level: "intermediate" },
        ],
      };
      componenet.filter("hard");
      expect(componenet.filtredSessions).toContain(<any>{
        name: "sesison 1",
        level: "hard",
      });
    });
  });
});
