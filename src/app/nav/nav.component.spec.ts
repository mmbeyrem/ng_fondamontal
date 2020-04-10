import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NavBarComponent } from "./navbar.component";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { EventService } from "../events/event.service";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

describe("NavComponent", () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockAuthService = {};
  let mockEventService = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: EventService, useValue: mockEventService },
      ],
      imports: [RouterTestingModule, FormsModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("Inital display", () => {
    it("should have the corect session title", () => {});
  });
});
