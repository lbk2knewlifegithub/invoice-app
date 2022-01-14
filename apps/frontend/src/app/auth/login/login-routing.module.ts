import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "@frontend/auth/login/containers";
import { LoginCanDeactivateGuard } from "./login-deactivate.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent,
    canDeactivate: [LoginCanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
