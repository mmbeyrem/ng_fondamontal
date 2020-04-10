import { Component, Input } from "@angular/core";
import { ISession } from "../../event.model";
import { AuthService } from "../../../user/auth.service";
import { Router } from "@angular/router";
import { VoteService } from "../../vote.service";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html",
  styleUrls: ["./session-list.component.css"],
})
export class SessionListComponent {
  @Input() sessions: ISession[];
  @Input() sessionId: number;
  constructor(
    private router: Router,
    private voteSerivce: VoteService,
    private authService: AuthService
  ) {}

  toggleVote(session: ISession) {
    if (!this.authService.IsAuthenticated())
      return this.router.navigateByUrl("/user/login");
    this.voteSerivce.userHasVoted(
      session,
      this.authService.currentUser.userName
    )
      ? this.voteSerivce.Remove(
          this.sessionId,
          session,
          this.authService.currentUser.userName
        )
      : this.voteSerivce.Vote(
          this.sessionId,
          session,
          this.authService.currentUser.userName
        );
  }
  userHasVoted(session) {
    return this.voteSerivce.userHasVoted(
      session,
      this.authService.currentUser.userName
    );
  }
}
