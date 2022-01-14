import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginFormComponent } from "@frontend/auth/login/components";
import { LoginPageComponent } from "@frontend/auth/login/containers";
import { LogoModule } from "@frontend/shared";
import { LoadingModule } from "@lbk/ui";
import { LoginRoutingModule } from "./login-routing.module";

const COMPONENTS = [LoginFormComponent];
const CONTAINERS = [LoginPageComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    LoadingModule,
    LogoModule,
  ],
  declarations: [CONTAINERS, COMPONENTS],
})
export class LoginModule {}
