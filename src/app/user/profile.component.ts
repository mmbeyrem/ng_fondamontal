import { Component, Injectable, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router, CanActivate } from "@angular/router";
import { INotify, Notify } from "../common/notification.service";

@Component({
  templateUrl: "./profile.template.html",
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
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    @Inject(Notify) private notifier: INotify,
    private router: Router
  ) {
    if (!!this.authService.IsAuthenticated()) {
      const firstName = new FormControl(
        this.authService.currentUser.firstName,
        [Validators.required, Validators.pattern("^([a-zA-Z])*")]
      );
      const lastName = new FormControl(
        this.authService.currentUser.lastName,
        Validators.required
      );
      this.profileForm = new FormGroup({
        firstName,
        lastName,
      });
    }
  }
  profileForm: FormGroup;
  Cancel() {
    this.router.navigateByUrl("/events");
  }
  HasError(control: FormControl | any) {
    debugger;
    if (control.errors == null) return false;
    if (control.errors["required"] != undefined) {
      control.errorMessage = "Required";
    } else {
      if (control.errors["pattern"] != undefined) {
        control.errorMessage = "pattern doesn't match";
      }
    }

    return control.invalid && control.touched;
  }
  IsValidFrom() {
    return this.profileForm.valid;
  }
  submit() {
    if (this.profileForm.valid) {
      this.authService
        .UpdateUser(
          this.profileForm.value.firstName,
          this.profileForm.value.lastName
        )
        .subscribe(() => {
          this.notifier.info("profile updated");
          this.router.navigateByUrl("/events");
        });
    }
  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl("/user/login");
    });
  }
}
@Injectable()
export class ProfileComponenetGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ) {
    if (!this.authService.IsAuthenticated()) {
      return this.router.navigateByUrl("/user/login");
    }
    return true;
  }
}
