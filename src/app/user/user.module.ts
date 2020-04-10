import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProfileComponent, ProfileComponenetGuard } from "./profile.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./LoginForm.componenet";
import { LoginGuard } from "./login.guard";

const userRoutes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [ProfileComponenetGuard],
  },
  { path: "login", component: LoginFormComponent, canActivate: [LoginGuard] },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfileComponent, LoginFormComponent],
  providers: [ProfileComponenetGuard],
})
export class UserModule {}
