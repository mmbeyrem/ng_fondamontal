import { VoteService } from "./vote.service";
import { ISession } from "../events/event.model";
import { of } from "rxjs";

describe("Voter Service", () => {
  let voterService: VoteService;
  let fakeHttp;
  beforeEach(() => {
    fakeHttp = jasmine.createSpyObj("fakeHttp", ["delete", "post"]);
    voterService = new VoteService(fakeHttp);
  });
  describe("delete voter", () => {
    it("should remove the voter from the list of voters", () => {
      let session = { id: 3, voters: ["joe", "john"] };
      fakeHttp.delete.and.returnValue(of(false));
      voterService.Remove(2, <ISession>session, "joe");

      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe("john");
    });

    it("should call http delete", () => {
      let session = { id: 3, voters: ["joe", "john"] };
      fakeHttp.delete.and.returnValue(of(false));
      voterService.Remove(2, <ISession>session, "joe");

      expect(fakeHttp.delete).toHaveBeenCalledWith(
        "/api/events/2/sessions/3/voters/joe"
      );
    });
  });
  describe("add voter", () => {
    it("call external service ", () => {
      let session = { id: 3, voters: [] };
      fakeHttp.post.and.returnValue(of(false));
      voterService.Vote(2, <ISession>session, "joe");

      expect(fakeHttp.post).toHaveBeenCalledWith(
        "/api/events/2/sessions/3/voters/joe",
        {},
        jasmine.any(Object)
      );
    });
  });
});
/*
jasmine.any({
          headers: jasmine.any({ "Content-Type": "application/json" }),
        }
*/
