import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginFormComponent } from "@frontend/auth/login/components";
import { LoginPageComponent } from "@frontend/auth/login/containers";
import { LoginRoutingModule } from "./login-routing.module";

export const COMPONENTS = [LoginPageComponent, LoginFormComponent];
export const CONTAINERS = [LoginPageComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule],
  declarations: [CONTAINERS, COMPONENTS],
})
export class LoginModule {}
