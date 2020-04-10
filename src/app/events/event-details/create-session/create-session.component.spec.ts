import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateSessionComponent } from "./create-session.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("CreateSessionComponent", () => {
  let component: CreateSessionComponent;
  let fixture: ComponentFixture<CreateSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSessionComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
