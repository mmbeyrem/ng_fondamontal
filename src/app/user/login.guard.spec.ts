import { TestBed, async, inject } from "@angular/core/testing";

import { LoginGuard } from "./login.guard";
import { AuthService } from "./auth.service";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe("LoginGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard, AuthService],
      imports: [HttpClientModule, RouterTestingModule],
    });
  });

  it("should ...", inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
