import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LogoModule } from "@frontend/shared";
import { LoadingModule } from "@lbk/ui";
import { SignUpFormComponent } from "./components";
import { SignUpPageComponent } from "./containers";
import { SignUpRoutingModule } from "./sign-up-routing.module";

const COMPONENTS = [SignUpFormComponent];
const CONTAINERS = [SignUpPageComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignUpRoutingModule,
    LoadingModule,
    LogoModule,
  ],
  declarations: [CONTAINERS, COMPONENTS],
})
export class SignUpModule {}
