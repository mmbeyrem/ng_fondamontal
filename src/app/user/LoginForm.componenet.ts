import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  templateUrl: "./Login.template.html",
})
export class LoginFormComponent {
  model: LoginModel;
  loginInvalid: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.model = new LoginModel();
  }

  login(loginForm: NgForm): void {
    this.authService
      .login(this.model.userName, this.model.password)
      .subscribe((resp) => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigateByUrl("/events");
          this.loginInvalid = false;
        }
      });
  }
  cancel(): void {
    this.router.navigateByUrl("/events");
  }
}
export class LoginModel {
  userName: string;
  password: string;
}
