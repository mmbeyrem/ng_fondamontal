import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.IsAuthenticated
      ? this.route.navigateByUrl("/user/profile")
      : true;
  }
}
