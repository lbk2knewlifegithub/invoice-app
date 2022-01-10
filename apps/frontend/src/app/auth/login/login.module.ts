import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginFormComponent } from "@frontend/auth/login/components";
import { LoginPageComponent } from "@frontend/auth/login/containers";
import { SharedModule } from "@frontend/shared";
import { UIModule } from "@lbk/ui";
import { LoginRoutingModule } from "./login-routing.module";

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];
export const CONTAINERS = [LoginPageComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    SharedModule,
    UIModule,
  ],
  declarations: [CONTAINERS, COMPONENTS],
})
export class LoginModule {}
