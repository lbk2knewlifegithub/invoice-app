import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "@frontend/auth/login/containers";
import { LoggedInGuard } from "../guard";
import { LoginCanDeactivateGuard } from "./login-can-deactivate.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent,
    canDeactivate: [LoginCanDeactivateGuard],
    canActivate: [LoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
