import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignUpPageComponent } from "@frontend/auth/sign-up/containers";
import { LoggedInGuard } from "../guard";
import { SignUpCanDeactivateGuard } from "./sign-up-deactivate.guard";

const routes: Routes = [
  {
    path: "",
    component: SignUpPageComponent,
    canDeactivate: [SignUpCanDeactivateGuard],
    canActivate: [LoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
