import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LogoModule } from "@frontend/shared";
import { LoadingModule } from "@lbk/ui";
import { StoreModule } from "@ngrx/store";
import { SignUpFormComponent } from "./components";
import { SignUpPageComponent } from "./containers";
import * as fromSignUpPage from "./sign-up-page.reducer";
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
    StoreModule.forFeature({
      name: fromSignUpPage.signUpPageFeatureKey,
      reducer: fromSignUpPage.reducer,
    }),
  ],
  declarations: [CONTAINERS, COMPONENTS],
})
export class SignUpModule {}
