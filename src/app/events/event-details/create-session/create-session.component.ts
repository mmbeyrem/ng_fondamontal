import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ISession } from "../../event.model";
import restrictedWord from "../../../common/restrictedWord.validator";

@Component({
  selector: "create-session",
  templateUrl: "./create-session.component.html",
  styleUrls: ["./create-session.component.css"]
})
export class CreateSessionComponent implements OnInit {
  levels = ["Beginner", "Intermediate", "Advanced"];
  durations = [
    { id: 1, text: "Half Hour" },
    { id: 2, text: "1 Hour" },
    { id: 3, text: "Half Day" },
    { id: 4, text: "Full Day" }
  ];
  name: FormControl;
  presenter: FormControl;
  abstract: FormControl;
  duration: FormControl;
  level: FormControl;
  sessionForm: FormGroup;
  @Output() saveNewSession = new EventEmitter<ISession>();
  @Output() cancelNewSession = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.name = new FormControl("", Validators.required);
    this.presenter = new FormControl("", Validators.required);
    this.duration = new FormControl("", Validators.required);
    this.level = new FormControl("", Validators.required);
    this.abstract = new FormControl("", [
      Validators.required,
      Validators.maxLength(400),
      restrictedWord(["foo", "boo"])
    ]);
    this.sessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }
  HasError(control: FormControl | any) {
    if (control.errors == null) return false;
    if (control.errors["required"] != undefined) {
      control.errorMessage = "Required";
    } else {
      if (control.errors["pattern"] != undefined) {
        control.errorMessage = "pattern doesn't match";
      } else {
        if (control.errors["restrictedWord"] != undefined) {
          control.errorMessage =
            control.errors["restrictedWord"] + " isn't permitted ";
        }
      }
    }

    return control.invalid && control.touched;
  }

  IsValidFrom() {
    return this.sessionForm.valid;
  }
  SaveSession() {
    console.log(this.sessionForm.value);
    const session: ISession = {
      id: undefined,
      name: this.name.value,
      duration: +this.duration.value,
      level: this.level.value,
      abstract: this.abstract.value,
      presenter: this.presenter.value,
      voters: []
    };
    this.saveNewSession.emit(session);
  }
  Cancel() {
    this.cancelNewSession.emit();
  }
}
